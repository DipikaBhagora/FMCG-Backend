const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName:{
        type:String,
        required: true,
    },
    lastName:{
        type:String
    },
    age:{
        type:Number,
        min:10,
        max:80,
    },
    number:{
        type:Number,
        min:10,
    },
    status:{
        type:Boolean,
        default:true
    },
    roleId:{
        type:Schema.Types.ObjectId,
        ref:"roles"
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    }
},
    {timestamps: true}
)

module.exports = mongoose.model("users",userSchema)