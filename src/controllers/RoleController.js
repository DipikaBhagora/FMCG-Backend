const roleModel = require("../models/RoleModel")
//roleModel == roles

//getallroles
const getAllRoles = async(req,res) =>{
    const roles = await roleModel.find();
    res.json({
        message:"All Roles fetched successfully..",
        data:roles,
    })
}

//addrole
const addRole = async(req,res) =>{
    const savedRole = await roleModel.create(req.body)
    res.json({
        message:"Role created..",
        data:savedRole
    })
}

//deleterole
const deleteRole = async(req,res)=>{
    
    //delete from roles where id =?
    //req.params
    //console.log(req.params.id) //prams object...
    const deletedRole = await roleModel.findByIdAndDelete(req.params.id)
    res.json({
        message:"Role deleted successfully..",
        Data:deletedRole
    })
}

//getrolebyid
const getRoleById = async(req,res)=>{
      //req.params.id
    const foundRole = await roleModel.findById(req.params.id)
    res.json({
        message:"Respective role fetched..",
        data:foundRole
    })
}

module.exports = {
    getAllRoles,
    addRole,
    deleteRole,
    getRoleById
}