const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var reviewSchema = new mongoose.Schema({
    postedby: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Refers to the user who posted the review
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // Refers to the product being reviewed
  star: { type: Number, required: true }, // Rating from 1 to 5
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});


//Export the model
module.exports = mongoose.model('Review', reviewSchema);