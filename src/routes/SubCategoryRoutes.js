const routes = require('express').Router();
const subcategoryController = require('../controllers/SubCategoryController');

routes.post("/addsubcategory",subcategoryController.addSubcategory);
routes.get("/getsubcategories",subcategoryController.getSubcategories);
routes.delete("/deletesubcategory/:id",subcategoryController.deletesubcategory);
routes.get("/getsubcategory/:id",subcategoryController.getSubCategoryById);
routes.get("/getsubcategorybycategory/:categoryId",subcategoryController.getSubCategoryByCategoryId)

module.exports = routes;