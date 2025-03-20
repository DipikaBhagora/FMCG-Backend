const mongoose = require("mongoose")
const Schema = mongoose.Schema

const cartSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"users"
    },
    productId:{
        type:Schema.Types.ObjectId,
        ref:"product"
    },
    quantity:{
        type:Number
    }
})

module.exports = mongoose.model("cart", cartSchema)