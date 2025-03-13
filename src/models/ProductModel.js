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
        required:true
    },
    offerPrice:{
        type:Number,
        required:true
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
        required:true
    },
    // createdAt:{
    //     type:Date,
    //     default: Date.now
    // }
},{
    timestamps: true
})

module.exports = mongoose.model("product",productSchema)