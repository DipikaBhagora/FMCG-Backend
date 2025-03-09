const routes = require("express").Router()
const roleController = require("../controllers/RoleController")

routes.get("/roles",roleController.getAllRoles);
routes.post("/addrole",roleController.addRole);
routes.delete("/deleterole/:id",roleController.deleteRole);
routes.get("/getrole/:id",roleController.getRoleById);

module.exports = routes;