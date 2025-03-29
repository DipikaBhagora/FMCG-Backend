const routes = require('express').Router();
const productController = require('../controllers/ProductController');

routes.post("/addproduct",productController.addProduct);
routes.get("/getproducts",productController.getProducts); //for admin
routes.delete("/deleteproduct/:id",productController.deleteProduct);
routes.get("/getproductbyid/:id",productController.getProductById); //by _id
routes.post("/addproductwithfile",productController.addProductWithFile)
routes.get("/getproductsbyuserid/:userId",productController.getAllProductsByUserId); //by userId //for particular user
routes.put("/updateproduct/:id", productController.updateProduct);
routes.get("/getproductbysubcategory/:subCategoryId",productController.getProductsBySubCategoryId);

module.exports = routes