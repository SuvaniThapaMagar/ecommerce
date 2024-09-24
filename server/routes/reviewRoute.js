const express = require("express");
const {
  rating,
  postReview,
  getAllProductReviews,
} = require("../controller/reviewCtrl");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

// Route to handle rating a product (rate or update rating)
router.put("/rate-product", authMiddleware, rating);

// Route to post a review for a product
router.post("/review", authMiddleware, postReview);

// Route to get all reviews for all products
router.get("/reviews", getAllProductReviews);

module.exports = router;
