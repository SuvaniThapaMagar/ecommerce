const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
    }
  ],
  paymentIntent: {},
  orderStatus: {
    type: String,
    default: 'Processing',
  },
  orderby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: String, // User's name
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
