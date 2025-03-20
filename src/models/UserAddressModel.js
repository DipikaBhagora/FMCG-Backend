const mongoose = require("mongoose")
const Schema = mongoose.Schema

const useraddressSchema = new Schema({

    userId:{
        type:Schema.Types.ObjectId,
        ref:"users"
    },
    title:{
        type:String
    },
    unitName:{
        type:String
    },
    street:{
        type:String
    },
    landMark:{
        type:String
    },
    cityId:{
        type:Schema.Types.ObjectId,
        ref:"city"
    },
    stateId:{
        type:Schema.Types.ObjectId,
        ref:"state"
    },
    addressDetail:{
        type:String
    },
    zipCode:{
        type:Number
    }
})

module.exports = mongoose.model("userAddress", useraddressSchema)