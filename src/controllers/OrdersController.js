const ordersModel = require("../models/OrdersModel")

//addorder
const addOrder = async(req,res) =>{
    try{
        const addorder = await ordersModel.create(req.body);
        res.status(201).json({
            message :"Order is added",
            data: addorder,
        })
    }catch(err){
        res.status(500).json({
            message:message.err
        })
    }
}

//deleteorder
const deleteOrder = async(req,res) =>{
    try{
        const deleteorder = await ordersModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message:"Order is deleted",
            data: deleteorder
        })
    }catch(err){
        res.status(500).json({
            message:message.err
        })
    }
}


//getallorders
const getOrders = async(req,res) =>{
    try{
        const getallorders = await ordersModel.find()
        res.status(200).json({
            message:"All Orders Fetched Successfully",
            data:getallorders,
        })
    }catch(err){
        res.status(500).json({
            message:message.err
        })
    }
}

module.exports = {
    addOrder,
    deleteOrder,
    getOrders
}