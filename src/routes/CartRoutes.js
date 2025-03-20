const routes = require('express').Router();
const cartController = require("../controllers/CartController")

routes.post("/addcart",cartController.addCart);
routes.put("/updatecart/:id",cartController.updateCart);
routes.delete("/deletecart/:id",cartController.deleteCart)

module.exports = routes