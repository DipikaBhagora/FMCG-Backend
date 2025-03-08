const routes = require("express").Router()
const roleCOntroller = require("../controllers/RoleController")

routes.get("/roles",roleCOntroller.getAllRoles);
routes.post("/addrole",roleCOntroller.addRole);
routes.delete("/deleterole/:id",roleCOntroller.deleteRole);
routes.get("/getrole/:id",roleCOntroller.getRoleById);

module.exports = routes;