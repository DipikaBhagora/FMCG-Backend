const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/AdminDashboardController");

// Define routes
router.get("/users/count", dashboardController.getTotalUsers);
router.get("/orders/count", dashboardController.getTotalOrders);
router.get("/products/count", dashboardController.getTotalProducts);
router.get("/orders/total-revenue", dashboardController.getTotalRevenue);
router.get("/orders/recent", dashboardController.getRecentOrders);
router.get("/users/recent", dashboardController.getRecentUsers);

module.exports = router;
