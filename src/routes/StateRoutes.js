const routes = require('express').Router();
const stateController = require('../controllers/StateController');

routes.post("/addstate", stateController.addState);
routes.get("/getallstates", stateController.getAllStates);
routes.delete("/deletestate/:id",stateController.deleteState);
routes.get("/getstate/:id",stateController.getStateById);

module.exports = routes;