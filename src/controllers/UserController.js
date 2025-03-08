const userModel = require("../models/UserModel")

//login

//signup

//getallusers
const getAllUsers = async(req,res)=>{
    const users = await userModel.find().populate("roleId")
    res.json({
        message:"All users fetched successfully..",
        data:users
    })
}
//adduser
const addUser = async(req,res)=>{
    const savedUser = await userModel.create(req.body);
    res.json({
        message:"User Added successfully..",
        data:savedUser
    })
}

//deleteuser
const deleteUser = async(req,res)=>{
    const deletedUser = await userModel.findByIdAndDelete(req.params.id)
    res.json({
        message:"User deleted successfully..",
        data:deletedUser
    })
}
//getuserbyid
const getUserById = async(req,res)=>{
    const foundUser = await userModel.findById(req.params.id);
    res.json({
        message:"Respective user fetched successfully..",
        data:foundUser
    })
}

module.exports = {
    // loginUser,
    // signupUser,
    getAllUsers,
    addUser,
    deleteUser,
    getUserById
}