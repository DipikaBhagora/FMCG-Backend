const cartModel = require("../models/CartModel")

//addcart
const addCart = async(req,res) => {
    try{
        const addcart = await cartModel.create(req.body)
        res.status(201).json({
            message: "Cart added",
            data: addcart,
        }
        )
    }catch(err) {
        res.status(500).json({
            message:err.message,
        })
    }
}

//updatecart
const updateCart = async(req,res) => {
    try{
        const updatecart = await cartModel.findByIdAndUpdate(req.params.id, req.body, {new:true})
        res.status(200).json({
            message:"Cart updated",
            data:updatecart
        })
    }catch(err) {
        res.status(500).json({
            message:err.message,
        })
    }
}

//deletecart
const deleteCart = async(req,res) => {
    try{
        const deletecart = await cartModel.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message:"Cart deleted",
            data:deletecart
        })
    }catch(err) {
        res.status(500).json({
            message:err.message,
        })
    }
}

//getcartbyid
const getCartById = async(req,res) => {
    try{
        const getcartbyid = await cartModel.findById(req.params.id).populate("userId productId quantity")
        res.status(200).json({
            message:"Cart is here",
            data:getcartbyid
        })
    }catch(err){
        res.status(500).json({
            message:err.message,
        })
    }
}

module.exports = {
    addCart,
    updateCart,
    deleteCart,
    getCartById
}