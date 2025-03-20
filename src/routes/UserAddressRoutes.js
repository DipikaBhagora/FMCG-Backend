const routes = require('express').Router();
const userAddressController = require('../controllers/UserAddressController')

routes.post("/addaddress",userAddressController.addAddress);
routes.get("/getalladdress",userAddressController.getAllAddress);
routes.get("/getaddressbyuserid/:userId",userAddressController.getAddressByUserId);
routes.put("/updateaddress/:id",userAddressController.updateAddress);
routes.delete("/deleteaddress/:id",userAddressController.deleteAddress);

module.exports = routes