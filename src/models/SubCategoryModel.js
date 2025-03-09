const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subcategorySchema = new Schema({

    name:{
        type: String,
        required: true,
    },
    categoryId:{
        type:Schema.Types.ObjectId,
        ref:"category"
    }
})
module.exports = mongoose.model("subcategory", subcategorySchema);    