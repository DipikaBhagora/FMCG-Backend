const User = require("../models/UserModel"); // your User model
const Order = require("../models/OrdersModel"); // your Order model
const Product = require("../models/ProductModel"); // your Product model

// 1. Get total users count
exports.getTotalUsers = async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch total users", error });
  }
};

// 2. Get total orders count
exports.getTotalOrders = async (req, res) => {
  try {
    const count = await Order.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch total orders", error });
  }
};

// 3. Get total products count
exports.getTotalProducts = async (req, res) => {
  try {
    const count = await Product.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch total products", error });
  }
};

// 4. Get total revenue
exports.getTotalRevenue = async (req, res) => {
  try {
    const orders = await Order.find({ status: "Done" }); // Only successful orders
    const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);
    res.status(200).json({ totalRevenue });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch total revenue", error });
  }
};

// 5. Get recent orders
exports.getRecentOrders = async (req, res) => {
    try {
      const orders = await Order.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("_id status createdAt"); // your model doesn't have 'orderNumber'
  
      // Create a dummy orderNumber if needed (e.g., based on _id)
      const formattedOrders = orders.map(order => ({
        _id: order._id,
        orderNumber: `#${order._id.toString().slice(-5)}`, // last 5 chars of _id
        status: order.status,
      }));
  
      res.status(200).json({ orders: formattedOrders });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch recent orders", error });
    }
  };

// 6. Get recent users
exports.getRecentUsers = async (req, res) => {
    try {
      const users = await User.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("_id firstName lastName createdAt");
  
      const formattedUsers = users.map(user => ({
        _id: user._id,
        name: `${user.firstName} ${user.lastName || ""}`.trim(), // Merge firstName + lastName
        joinedTime: timeAgo(user.createdAt),
      }));
  
      res.status(200).json({ users: formattedUsers });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch recent users", error });
    }
  };

// Helper function to calculate time ago (simple version)
function timeAgo(date) {
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  let interval = Math.floor(seconds / 3600);
  if (interval < 24) {
    return `${interval}h ago`;
  } else {
    interval = Math.floor(interval / 24);
    return interval === 1 ? "yesterday" : `${interval} days ago`;
  }
}
