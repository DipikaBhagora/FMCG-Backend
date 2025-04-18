const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactusSchema = new Schema({
    name:{
        type:String,
        requird:true,
    },
    email:{
        type:String,
        requird:true,
       // unique:true
    },
    message:{
        type:String,
        requird:true,
    }
},{
    timestamps:true
})
module.exports = mongoose.model("contactus",contactusSchema);