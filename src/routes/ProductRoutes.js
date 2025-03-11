const routes = require('express').Router();
const productController = require('../controllers/ProductController');

routes.post("/addproduct",productController.addProduct);
routes.get("/getproducts",productController.getProducts);
routes.delete("/deleteproduct/:id",productController.deleteProduct);
routes.get("/getproduct/:id",productController.getProductById);
routes.post("/addproductwithfile",productController.addProductWithFile)
routes.get("/getproductsbyuserid/:sellerId",productController.getAllProductsBySellerId);

module.exports = routes