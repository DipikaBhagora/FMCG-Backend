const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ordersSchema = new Schema ({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"users"
    },
    items: [
        {
          productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
          productName: String,
          offerPrice: Number,
        },
      ],
    status:{
        enum: ['Pending','Shipped','Delivered','Cancelled'],
        type: String
    },
    totalAmount:{
        type:Number,
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Failed'],
        default: 'Pending',
      }
},{
    timestamps: true
})

module.exports = mongoose.model("orders",ordersSchema)