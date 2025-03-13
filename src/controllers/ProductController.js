const productModel = require("../models/ProductModel");
const multer = require("multer") //file uploadinng
const path = require("path") //for file path
const cloudinaryUtil = require("../utils/CloudinaryUtil");

//storage engine
const storage = multer.diskStorage({
    //destination: "./uploads",
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
// const addProductWithFile = async(req,res) =>{

//     upload(req,res,(err) =>{
//         if(err){
//             res.status(500).json({
//                 message:err.message
//             })
//         }else{
//             //to store data in database
//             //claudinary
//             console.log(req.body)
//             res.status(200).json({
//                 message:"File uploaded successfully",
//                 data:req.file
//             })

//         }
//     })

// }

//addProudctwithfile for cloud storage //fileupload --> image --> cloudanry: -->respinse ---> url : url -->database...
const addProductWithFile = async(req,res) =>{

    upload(req,res,async(err) =>{
        if(err){
            res.status(500).json({
                message:err.message
            })
        }else{
            //to store data in database
            //claudinary
           const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file);
           console.log(cloudinaryResponse);
           console.log(req.body);

            //to store data in database 
            req.body.productImages = cloudinaryResponse.secure_url;
            
            const savedproductimages = await productModel.create(req.body);

            res.status(200).json({
                message:"Product with image saved successfully..",
                data:savedproductimages
            })
        }
    })
}

//getallproductsbyuserId
const getAllProductsByUserId = async(req, res) =>{
    try{
        const products = await productModel.find({userId:req.params.userId}).populate("categoryId subCategoryId userId");
        if(products.length === 0){
            res.status(404).json({message: "NO PRODUCTS FOUND"})
        }else{
            res.status(200).json({
                message:"Products found successfully..",
                data: products,
            })
        }
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

//getallproducts //for admin
const getProducts = async(req,res)=>{
    try{
        const getallproducts = await productModel.find().populate('categoryId subCategoryId userId')
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

//updateproduct
const updateProduct = async(req,res) => {
      //update tablename set  ? where id = ?
  //update new data -->req.body
  //id -->req.params.id

  try{
    const updateproduct = await productModel.findByIdAndUpdate
    (req.params.id,
    req.body,
    { new: true }
    );
    res.status(200).json({
        message: "Product updated successfully..",
        data: updateproduct,
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
        const getproductbyid = await productModel.findById(req.params.id).populate('categoryId subCategoryId userId');
        if(!getproductbyid){
            res.status(404).json({message:"NO PRODUCTS FOUND"});
        }
       else{
        res.status(200).json({
            message:"Product found",
            data:getproductbyid
        })
    } 
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
    addProductWithFile,
    getAllProductsByUserId,
    updateProduct
}