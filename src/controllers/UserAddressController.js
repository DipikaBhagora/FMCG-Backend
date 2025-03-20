const userAddressModel = require("../models/UserAddressModel");

//addAddress
const addAddress = async(req, res) => {
    try{
        const addaddress = await userAddressModel.create(req.body);
        res.status(201).json({
            message:"Address added succesfully",
            data: addaddress,
        })
    }catch(err){
        res.status(500).json({
            message:err,
        })
    }
}

//getalladdress
const getAllAddress = async(req, res) => {
    try{
        const addresses = await userAddressModel.find();
        res.status(200).json({
            message:"All Address fetched successfully",
            data: addresses,
        })
    }catch(err){
        res.status(500).json({
            message:err,
        })
    }
}

//deleteaddress
const deleteAddress = async(req, res) => {
    try{
        const deleteaddress = await userAddressModel.findByIdAndDelete(req.params.id)
        res.json({
            message:"data is deleted",
            data: deleteaddress,
        })
    }catch(err){
        res.status(500).json({
            message:err
        })
    }
}

//getaddressbyid
const getAddressByUserId = async(req, res) => {
    try{
        const findaddress = await userAddressModel.findById(req.params.id)
        res.status(200).json({
            message:"Particular user address data is found",
            data: findaddress,
        })
    }catch(err){
        res.status(500).json({
            message:err
        })
    }
}

//updateaddress
const updateAddress = async(req,res) => {
try{
    const updateaddress = await userAddressModel.findByIdAndUpdate(req.params.id, req.body, { new:true });
    res.status(200).json({
        message:"Address Data updated successfully..",
        data: updateaddress,
    })

}catch(err){
    res.status(500).json({
        message:err.message
    })
}
}

module.exports = {
    addAddress,
    getAllAddress,
    deleteAddress,
    getAddressByUserId,
    updateAddress
}