const productModel = require("../models/ProductModel");
const multer = require("multer") //file uploadinng
const path = require("path") //for file path

//storage engine
const storage = multer.diskStorage({
    destination: "./uploads",
    filename: function(req,file,cb){
        cb(null,file.originalname)
    }
})

//multer object
const upload = multer({
    storage:storage,
    //filefilter
}).single("image") //file named as image


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

//addProudctwithfile for local storage
const addProductWithFile = async(req,res) =>{

    upload(req,res,(err) =>{
        if(err){
            res.status(500).json({
                message:err.message
            })
        }else{
            //to store data in database
            //claudinary
            console.log(req.body)
            res.status(200).json({
                message:"File uploaded successfully",
                data:req.file
            })

        }
    })

}

//addProudctwithfile for cloud storage //fileupload --> image --> cloudanry: -->respinse ---> url : url -->database...
// const addProductWithFile = async(req,res) =>{

//     upload(req,res,(err) =>{
//         if(err){
//             res.status(500).json({
//                 message:err.message
//             })
//         }else{
//             //to store data in database
//             //claudinary
           


//         }
//     })

// }

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
    deleteProduct,
    addProductWithFile
}