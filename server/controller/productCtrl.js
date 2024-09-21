const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const User = require("../models/userModel");
const validateMongoDbId = require("../utils/validateMgdbId");
const cloudinaryUploadImg = require("../utils/cloudinary");
const path = require("path");
const fs = require("fs");
// Create a new product
const createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct); // 201 Created
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
});

// Update a product by ID
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true, // Ensure validation is run during update
    });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a product by ID
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single product by ID
const getaProduct = asyncHandler(async (req, res) => {

  const { id } = req.params;
  console.log("Requested Product ID:", id); // Log the ID
  validateMongoDbId(id)
  try {
    const foundProduct = await Product.findById(id);
    if (!foundProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(foundProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all products with optional category filtering
const getAllProduct = asyncHandler(async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);

    // Handle category filtering
    if (req.query.category) {
      queryObj.category = req.query.category;
    }

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Product.find(JSON.parse(queryStr));

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // Limiting fields
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // Pagination
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const productCount = await Product.countDocuments();
      if (skip >= productCount) throw new Error("This Page does not exist");
    }

    const products = await query;
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//wishlisrt
const addToWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { prodId } = req.body;
  try {
    const user = await User.findById(_id);
    const alreadyadded = user.wishlist.find((id) => id.toString() === prodId);
    if (alreadyadded) {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $pull: { wishlist: prodId },
        },
        {
          new: true,
        }
      );
      res.json(user);
    } else {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $push: { wishlist: prodId },
        },
        {
          new: true,
        }
      );
      res.json(user);
    }
  } catch (error) {
    throw new Error(error);
  }
});

//rating
const rating = asyncHandler(async (req, res) => {
  const { _id } = req.user; // User ID from the authenticated user
  const { star, prodId, comment } = req.body; // Star rating and product ID from the request body

  try {
    // Find the product by its ID
    const product = await Product.findById(prodId);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    // Check if the user has already rated this product
    let alreadyRated = product.ratings.find(
      (rating) => rating.postedby.toString() === _id.toString()
    );

    if (alreadyRated) {
      // If the user has already rated the product, update the rating
      const updateRating = await Product.updateOne(
        {
          _id: prodId,
          "ratings._id": alreadyRated._id,
        },
        {
          $set: { "ratings.$.star": star, "ratings.$.comment": comment },
        },
        {
          new: true,
        }
      );
      res.json(updateRating);
    } else {
      // If the user has not rated the product, add a new rating
      const rateProduct = await Product.findByIdAndUpdate(
        prodId,
        {
          $push: {
            ratings: {
              star: star,
              comment: comment,
              postedby: _id,
            },
          },
        },
        {
          new: true,
        }
      );
      res.json(rateProduct);
    }
    const getallratings = await Product.findById(prodId);
    let totalRating = getallratings.ratings.length;
    let ratingsum = getallratings.ratings
      .map((item) => item.star)
      .reduce((prev, curr) => prev + curr, 0);
    let actualRating = Math.round(ratingsum / totalRating);
    let finalproduct = await Product.findByIdAndUpdate(
      prodId,
      {
        totalrating: actualRating,
      },
      { new: true }
    );
    res.json(finalproduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Define the delay function
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const uploadImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id); // Ensure this function is correctly implemented

  try {
      const uploader = async (filePath) => cloudinaryUploadImg(filePath); // Use your Cloudinary upload function
      const urls = [];
      const files = req.files;

      for (const file of files) {
          const filePath = path.join(__dirname, '../public/images/', file.filename);

          try {
              const result = await uploader(filePath); // Attempt to upload the file to Cloudinary
              urls.push(result.url);

              // Add a small delay before deleting the local file
              await delay(3000);

              // Delete the local file after uploading to Cloudinary
              fs.unlinkSync(filePath);
          } catch (error) {
              console.error("Error uploading or deleting file:", error.message);
          }
      }

      // Update the product with the image URLs
      const updatedProduct = await Product.findByIdAndUpdate(
          id,
          { images: urls },
          { new: true }
      );
      
      res.json(updatedProduct);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});



module.exports = {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
  uploadImages,
};