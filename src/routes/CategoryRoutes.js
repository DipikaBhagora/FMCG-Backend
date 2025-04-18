const routes = require('express').Router();
const categoryController = require('../controllers/CategoryController');

routes.post("/addcategory",categoryController.addCategory);
routes.get("/getcategories",categoryController.getCategories);
routes.delete("/deletecategory/:id",categoryController.deleteCategory);
routes.get("/getcategory/:id",categoryController.getCategoryById);
routes.put("/updatecategory/:id",categoryController.updateCategory);

module.exports = routes;