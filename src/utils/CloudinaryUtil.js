 const cloudinary = require("cloudinary").v2; 

 const uploadFileToCloudinary = async(file) =>{

    //config
    cloudinary.config({
        cloud_name:"dsu2usoxu",
        api_key:"369259867468831",
        api_secret:"pBt_Ipo7GaNROh_9wpkv8gDTvFw"
    })

    const cloudinaryResponse = await cloudinary.uploader.upload(file.path)
    return cloudinaryResponse;

 }

 module.exports = {
    uploadFileToCloudinary
 }