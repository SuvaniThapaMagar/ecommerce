const Review = require("../models/reviewModel");
const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const rating = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, productId, comment } = req.body;

  // Validate input
  if (!star || !productId) {
    return res
      .status(400)
      .json({ message: "Star rating and Product ID are required" });
  }

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if user already rated the product
    const alreadyRated = product.ratings.find(
      (rating) => rating.postedby.toString() === _id.toString()
    );

    if (alreadyRated) {
      // Update the existing rating
      await Product.updateOne(
        {
          _id: productId,
          "ratings._id": alreadyRated._id,
        },
        {
          $set: { "ratings.$.star": star, "ratings.$.comment": comment },
        }
      );
    } else {
      // Push a new rating
      await Product.findByIdAndUpdate(
        productId,
        {
          $push: {
            ratings: {
              star: star,
              comment: comment,
              postedby: _id,
            },
          },
        },
        { new: true }
      );
    }

    // Recalculate total rating
    const updatedProduct = await Product.findById(productId).populate(
      "ratings.postedby",
      "firstname lastname"
    );

    const totalRating = updatedProduct.ratings.length;
    const ratingSum = updatedProduct.ratings.reduce(
      (sum, item) => sum + item.star,
      0
    );
    const actualRating = Math.round((ratingSum / totalRating) * 10) / 10; // Round to 1 decimal place

    updatedProduct.totalrating = actualRating;
    await updatedProduct.save();

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const postReview = asyncHandler(async (req, res) => {
  const { productId, star, comment } = req.body;
  const userId = req.user._id;

  // Validate input
  if (!productId || !star || !comment) {
    return res
      .status(400)
      .json({ message: "Product ID, star rating, and comment are required" });
  }

  try {
    // Check if the user has already reviewed the product
    const existingReview = await Review.findOne({
      productId,
      postedby: userId,
    });

    if (existingReview) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this product" });
    }

    const review = new Review({
      postedby: userId,
      productId,
      star,
      comment,
    });

    await review.save();

    res.status(201).json({ message: "Review added successfully", review });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add review", error: error.message });
  }
});

const getAllProductReviews = asyncHandler(async (req, res) => {
  try {
    // Fetch all reviews and populate product and user details
    const reviews = await Review.find({})
      .populate("productId", "title price images totalrating") // Make sure images are populated
      .populate("postedby", "firstname lastname");

    if (!reviews.length) {
      return res.status(404).json({ message: "No reviews found" });
    }

    res.status(200).json({
      reviews, // Contains product details including images and user info
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reviews", error: error.message });
  }
});

module.exports = {
  rating,
  postReview,
  getAllProductReviews,
};
