const express = require('express');
const { createOrder, getUserOrders, updateOrderStatus } = require('../controller/orderCtrl');
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

// Create an order
router.post('/create', authMiddleware, createOrder);

// Get orders for a specific user
router.get('/user-orders', authMiddleware, getUserOrders);

// Update order status
router.put('/status', authMiddleware, updateOrderStatus);





module.exports = router;
