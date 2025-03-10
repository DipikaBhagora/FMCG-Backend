const userModel = require("../models/UserModel")
const bcrypt = require("bcrypt") //pass encrypt
const mailUtil = require("../utils/MailUtil") //importing from utils

//login
const loginUser = async(req,res) =>{
    //req.body email and password: password(encryption)

   //password -->plain -->db -->encrypted
   //bcrypt  --> plain,enc --> match : true

   const email = req.body.email;
   const password = req.body.password;
   //userModel.find({email:email,password:password})
  //email --> object -->abc --{password:hashedPassword}
  //normal password compare -->

  //const foundUserEmail = userModel.findOne({ email:req.body.email })
  const foundUserFromEmail = await userModel.findOne({ email: email }).populate("roleId")
  console.log(foundUserFromEmail);
 
  //check if email exist or not
  if(foundUserFromEmail != null){
    //password
    //normal -plain req.bodyy --- databse -->match  --> true | false
    const isMatch = bcrypt.compareSync(password, foundUserFromEmail.password);
    //true | false
    if(isMatch == true){
        
        res.status(200).json({
            message:"Login Success..",
            data:foundUserFromEmail,
            
        })
    }else{
        res.status(404).json({
            message:"Invalid credentials..",
        })
    }
    }else{
        res.status(404).json({
           message:"Email not found.."
        })
    }
  }
  


//signup
const signupUser = async(req,res)=>{
    try{
        //password encrypt
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
        req.body.password = hashedPassword;

        const createdUser = await userModel.create(req.body);
        //console.log(createdUser);       

        //send mail to user
        //const mailResponse = await mailUtil.sendingMail(createdUser.email,"welcome to fmcg","welcome to our service") //mail response
        await mailUtil.sendingMail(createdUser.email,"welcome to fmcg","welcome to our service")

        res.status(201).json({
            message:"user created successfully..",
            data:createdUser,
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:"error",
            data:err,
        })
    }
}

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
    loginUser,
    signupUser,
    getAllUsers,
    addUser,
    deleteUser,
    getUserById
}