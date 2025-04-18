const routes = require('express').Router();
const ordersController = require("../controllers/OrdersController");

routes.post("/addorder",ordersController.addOrder);
routes.get("/getorders",ordersController.getOrders);
routes.delete("/deleteorder/:id",ordersController.deleteOrder);
routes.patch("/updatepayment",ordersController.updatePaymentStatus);
routes.post("/createrazorpayorder", ordersController.createRazorpayOrder);
routes.patch("/updatepaymentrazorpay",ordersController.updatePaymentStatusRazorpay);
routes.get("/getorderdetails/:id",ordersController.getOrderDetails)


module.exports = routes;