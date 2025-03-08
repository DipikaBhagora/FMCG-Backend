const routes = require("express").Router()
const userController = require("../controllers/UserController")

routes.get("/users",userController.getAllUsers);
routes.post("/adduser",userController.addUser);
routes.delete("/deleteuser/:id",userController.deleteUser);
routes.get("/getuser/:id",userController.getUserById);


module.exports = routes;
