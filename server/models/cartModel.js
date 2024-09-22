const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity can not be less than 1.'],
    default: 1,
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price can not be negative.'],
  },
  image: {
    type: String,
    required: false, // Changed from true to false
  },
}, { _id: true });

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  cartItems: [cartItemSchema],
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
    min: [0, 'Total price can not be negative.'],
  },
}, { timestamps: true });

cartSchema.methods.calculateTotalPrice = function() {
  this.totalPrice = this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
};

module.exports = mongoose.model("Cart", cartSchema);