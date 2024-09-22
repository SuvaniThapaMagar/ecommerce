const express = require("express");
const { 
  addToCart, 
  getCartItems,
  removeFromCart,
  updateCartQuantity
 
} = require("../controller/cartController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

// Apply authMiddleware to all routes
router.use(authMiddleware);


// Add product to the cart
router.post("/add", addToCart);
router.get("/get-item", getCartItems);
router.delete("/remove/:cartItemId",  removeFromCart,);
router.patch("/update/:cartItemId", updateCartQuantity);




module.exports = router;