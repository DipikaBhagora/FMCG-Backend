const routes = require('express').Router();
const contactusController = require('../controllers/ContactUsController');

routes.post("/addmessage",contactusController.addMessages);
routes.get("/getallmessages",contactusController.getAllMessages);
routes.delete("/deletemessage",contactusController.deleteMessages);

module.exports = routes;