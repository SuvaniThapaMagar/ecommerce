const Order = require('../models/orderModel'); // Assuming your model file is named `order.js`

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { products, paymentIntent, orderStatus } = req.body;

    const newOrder = new Order({
      products: products.map((prod) => ({
        product: prod.productId,
        quantity: prod.quantity,
      })),
      paymentIntent,
      orderStatus,
      orderby: req.user._id,
      name: req.user.firstname + ' ' + req.user.lastname, // Get user's name from auth middleware
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order', error });
  }
};


// Get orders by a specific user
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ orderby: req.user._id }).populate('products.product');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve orders', error });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const order = await Order.findByIdAndUpdate(orderId, { orderStatus: status }, { new: true });

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update order status', error });
  }
};


// Get order statistics
const getOrderStats = async (req, res) => {
  try {
    const stats = await Order.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          pending: {
            $sum: { $cond: [{ $eq: ["$orderStatus", "Pending"] }, 1, 0] }
          },
          processing: {
            $sum: { $cond: [{ $eq: ["$orderStatus", "Processing"] }, 1, 0] }
          },
          shipped: {
            $sum: { $cond: [{ $eq: ["$orderStatus", "Shipped"] }, 1, 0] }
          },
          delivered: {
            $sum: { $cond: [{ $eq: ["$orderStatus", "Delivered"] }, 1, 0] }
          },
          cancelled: {
            $sum: { $cond: [{ $eq: ["$orderStatus", "Cancelled"] }, 1, 0] }
          }
        }
      }
    ]);

    const orderStats = stats.length > 0 ? stats[0] : {
      total: 0,
      pending: 0,
      processing: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0
    };

    delete orderStats._id;
    res.status(200).json(orderStats);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve order statistics', error });
  }
};



module.exports = {
  createOrder,
  getUserOrders,
  updateOrderStatus,
  getOrderStats
};
