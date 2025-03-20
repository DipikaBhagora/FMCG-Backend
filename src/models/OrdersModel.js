const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ordersSchema = new Schema ({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"users"
    },
    status:{
        enum: ['Pending','Shipped','Delivered','Cancelled'],
        type: String
    },
    totalAmount:{
        type:Number,
    },
},{
    timestamps: true
})

module.exports = mongoose.model("orders",ordersSchema)