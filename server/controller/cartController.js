const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

// Add to Cart
const addToCart = asyncHandler(async (req, res) => {
  let productId, quantity, image;

  if (req.body.cart && Array.isArray(req.body.cart) && req.body.cart.length > 0) {
    productId = req.body.cart[0].productId;
    quantity = req.body.cart[0].quantity;
    image = req.body.cart[0].image;
  } else {
    productId = req.body.productId;
    quantity = req.body.quantity;
    image = req.body.image;
  }

  const userId = req.user._id;

  if (!productId || !quantity || !image) {
    return res.status(400).json({ message: "Product ID, quantity, and image are required" });
  }

  try {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    const productObjectId = new mongoose.Types.ObjectId(productId);
    const product = await Product.findById(productObjectId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, cartItems: [], totalPrice: 0 });
    }

    const existingItemIndex = cart.cartItems.findIndex(item => item.product.toString() === productId);

    if (existingItemIndex > -1) {
      cart.cartItems[existingItemIndex].quantity += quantity;
    } else {
      cart.cartItems.push({
        product: productObjectId,
        quantity,
        price: product.price,
        image: image, // Save the image URL
      });
    }

    cart.calculateTotalPrice();
    await cart.save();

    const populatedCart = await Cart.findById(cart._id).populate("cartItems.product");
    res.status(200).json({ cartItems: populatedCart.cartItems });
  } catch (error) {
    console.error("Error in addToCart:", error);
    res.status(500).json({
      message: "An error occurred while adding to cart",
      error: error.message,
    });
  }
});

// Get Cart Items
const getCartItems = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId }).populate("cartItems.product");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json({ cartItems: cart.cartItems });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({
      message: "An error occurred while fetching cart items",
      error: error.message,
    });
  }
});

// Remove Item from Cart by Cart Item ID
const removeFromCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const cartItemId = req.params.cartItemId; // Changed to cartItemId

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.cartItems.findIndex(item => item._id.toString() === cartItemId);

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    cart.cartItems.splice(itemIndex, 1); // Remove item from the array
    cart.calculateTotalPrice();

    await cart.save();
    res.status(200).json({ cartItems: cart.cartItems });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({
      message: "An error occurred while removing item from cart",
      error: error.message,
    });
  }
});

// Update Cart Item Quantity
const updateCartQuantity = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const cartItemId = req.params.cartItemId; // Changed to cartItemId
  const { quantity } = req.body;

  if (!quantity || quantity < 1) {
    return res.status(400).json({ message: "Invalid quantity" });
  }

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.cartItems.findIndex(item => item._id.toString() === cartItemId);

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    cart.cartItems[itemIndex].quantity = quantity;
    cart.calculateTotalPrice();

    await cart.save();
    res.status(200).json({ cartItems: cart.cartItems });
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
    res.status(500).json({
      message: "An error occurred while updating cart item quantity",
      error: error.message,
    });
  }
});

module.exports = {
  addToCart,
  getCartItems,
  removeFromCart,
  updateCartQuantity,
};
