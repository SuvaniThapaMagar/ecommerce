const express = require("express");
const { 
  addToCart, 
  getCartItems
 
} = require("../controller/cartController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

// Apply authMiddleware to all routes
router.use(authMiddleware);


// Add product to the cart
router.post("/add", addToCart);
router.get("/get-item", getCartItems);



module.exports = router;