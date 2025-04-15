require('dotenv').config();
 const cloudinary = require("cloudinary").v2; 

 const uploadFileToCloudinary = async(file) =>{

    //config
    cloudinary.config({
        cloud_name:process.env.cloud_name,
        api_key:process.env.api_key,
        api_secret:process.env.api_secret
    })

    const cloudinaryResponse = await cloudinary.uploader.upload(file.path)
    return cloudinaryResponse;

 }

 module.exports = {
    uploadFileToCloudinary
 }