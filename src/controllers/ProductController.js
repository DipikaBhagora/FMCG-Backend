const productModel = require("../models/ProductModel");

//addproduct
const addProduct = async(req,res)=>{
    try{
        const savedproduct = await productModel.create(req.body);
        res.status(201).json({
            message:"Product added successfully",
            data: savedproduct
        })
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}
//getallproducts
const getProducts = async(req,res)=>{
    try{
        const getallproducts = await productModel.find().populate('categoryId subCategoryId sellerId')
        res.status(200).json({
            message:"All products",
            data: getallproducts
        })
    }catch(err){
        res.status(500).json({
                message:err.message
        })
    }
}

//getproductbyid
const getProductById = async(req,res)=>{
    try{
        const getproductbyid = await productModel.findById(req.params.id).populate('categoryId subCategoryId sellerId');
        res.status(200).json({
            message:"Product found",
            data:getproductbyid
        })
    }catch(err){
        res.status(500).json({
            message:err.message
    })
    }
}

//deleteproduct
const deleteProduct = async(req,res)=>{
    try{
        const deletedproduct = await productModel.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message:"Product deleted Successfully",
            data:deletedproduct
        })
    }catch(err){
        res.status(500).json({
            message:err.message
    })
    }
}

//updateproduct

module.exports = {
    addProduct,
    getProducts,
    getProductById,
    deleteProduct
}