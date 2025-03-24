const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productName:{
        type:String,
        required:true
    },
    categoryId:{
        type:Schema.Types.ObjectId,
        ref:"category",
        required:true
    },
    subCategoryId:{
        type:Schema.Types.ObjectId,
        ref:"subcategory",
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    basePrice:{
        type:Number,
        required:true,
        min: 0, //prevent -ve price
    },
    offerPrice:{
        type:Number,
        required:true,
        min: 0,
    },
    offerPercentage:{
        type:Number,
        required:true
    },
    productDetail:{
        type:String,
        required:true
    },
    productImages:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true,
        min:0, //prevent -ve stock
        default: 0,
    },
    // createdAt:{
    //     type:Date,
    //     default: Date.now
    // }
},{
    timestamps: true
})
// productSchema.virtual("offerPercentage").get(function () {
//     if (this.basePrice > 0) {
//         return Math.round(((this.basePrice - this.offerPrice) / this.basePrice) * 100);
//     }
//     return 0;
// });
module.exports = mongoose.model("product",productSchema)