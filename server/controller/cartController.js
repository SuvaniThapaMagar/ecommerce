const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

const addToCart = asyncHandler(async (req, res) => {
  let productId, quantity;

  // Check if the request body has a 'cart' array
  if (
    req.body.cart &&
    Array.isArray(req.body.cart) &&
    req.body.cart.length > 0
  ) {
    // For now, we'll just handle the first item in the cart array
    productId = req.body.cart[0].productId;
    quantity = req.body.cart[0].quantity;
  } else {
    // If not, assume the productId and quantity are top-level properties
    productId = req.body.productId;
    quantity = req.body.quantity;
  }

  const userId = req.user._id;

  console.log("Product ID:", productId);
  console.log("Quantity:", quantity);

  if (!productId || !quantity) {
    return res
      .status(400)
      .json({ message: "Product ID and quantity are required" });
  }

  try {
    // Validate productId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    // Convert productId to ObjectId
    const productObjectId = new mongoose.Types.ObjectId(productId);

    // First, check if the product exists
    const product = await Product.findById(productObjectId);
    console.log("Fetched Product:", product);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, cartItems: [], totalPrice: 0 });
    }

    const existingItemIndex = cart.cartItems.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingItemIndex > -1) {
      cart.cartItems[existingItemIndex].quantity += quantity;
    } else {
      cart.cartItems.push({
        product: productObjectId,
        quantity,
        price: product.price,
      });
    }

    cart.calculateTotalPrice();

    await cart.save();

    const populatedCart = await Cart.findById(cart._id).populate(
      "cartItems.product"
    );
    res.status(200).json({ cartItems: populatedCart.cartItems });
  } catch (error) {
    console.error("Error in addToCart:", error);
    res
      .status(500)
      .json({
        message: "An error occurred while adding to cart",
        error: error.message,
      });
  }
});

const getCartItems = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId }).populate(
      "cartItems.product"
    );
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json({ cartItems: cart.cartItems });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res
      .status(500)
      .json({
        message: "An error occurred while fetching cart items",
        error: error.message,
      });
  }
});

module.exports = {
  addToCart,
  getCartItems,
};
