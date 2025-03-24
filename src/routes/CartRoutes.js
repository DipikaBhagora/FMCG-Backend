const routes = require('express').Router();
const cartController = require("../controllers/CartController")

routes.post("/addcart",cartController.addCart);
routes.put("/updatecart/:id",cartController.updateCart);
routes.delete("/deletecart/:id",cartController.deleteCart);
routes.get("/getcart/:userId",cartController.getCartByUserId);

module.exports = routes