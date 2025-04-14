const ordersModel = require("../models/OrdersModel");
const Product = require("../models/ProductModel");

//addorder
// const addOrder = async(req,res) =>{
//     try{
//         const addorder = await ordersModel.create(req.body);
//         res.status(201).json({
//             message :"Order is added",
//             data: addorder,
//         })
//     }catch(err){
//         res.status(500).json({
//             message:message.err
//         })
//     }
// }
const addOrder = async (req, res) => {
    const { userId, items, totalAmount } = req.body;
  
    try {
      // Create the order
      const newOrder = await ordersModel.create({
        userId,
        status: 'Pending',
        totalAmount,
      });
       // Loop through items and reduce actualStock
    await Promise.all(
        items.map(async (item) => {
          const product = await Product.findById(item.productId);
          if (!product) {
            throw new Error(`Product with ID ${item.productId} not found`);
          }
  
          if (product.actualStock < item.quantity) {
            throw new Error(`Insufficient stock for ${product.productName}`);
          }
  
          product.actualStock -= item.quantity;
          await product.save();
        })
      );
  
      res.status(201).json({
        message: "Order placed successfully and stock updated.",
        data: newOrder,
      });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: err.message || "Error placing order",
      });
    }
  };

//deleteorder
const deleteOrder = async(req,res) =>{
    try{
        const deleteorder = await ordersModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message:"Order is deleted",
            data: deleteorder
        })
    }catch(err){
        res.status(500).json({
            message:message.err
        })
    }
}


//getallorders
const getOrders = async(req,res) =>{
    try{
        const getallorders = await ordersModel.find().populate("userId")
        res.status(200).json({
            message:"All Orders Fetched Successfully",
            data:getallorders,
        })
    }catch(err){
        res.status(500).json({
            message:message.err
        })
    }
}

module.exports = {
    addOrder,
    deleteOrder,
    getOrders
}