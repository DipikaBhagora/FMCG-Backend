const ordersModel = require("../models/OrdersModel");
const Product = require("../models/ProductModel");

//add order
const addOrder = async (req, res) => {
    const { userId, items, totalAmount } = req.body;
  
    try {
      if (!items || items.length === 0) {
        return res.status(400).json({ message: "No items provided" });
      }

      // Create the order
      const newOrder = await ordersModel.create({
        userId,
        items, // Now items will be saved in db
        status: 'Pending',
        totalAmount,
      });

      //Temporarily skip stock update
       // Loop through items and reduce actualStock
    // await Promise.all(
    //     items.map(async (item) => {
    //       const product = await Product.findById(item.productId);
    //       if (!product) {
    //         throw new Error(`Product with ID ${item.productId} not found`);
    //       }
  
    //       if (product.actualStock < item.quantity) {
    //         throw new Error(`Insufficient stock for ${product.productName}`);
    //       }
  
    //       product.actualStock -= item.quantity;
    //       await product.save();
    //     })
    //   );
  
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
        const getallorders = await ordersModel.find().populate("userId").populate("items.productId", "productName price");
        res.status(200).json({
            message:"All Orders Fetched Successfully",
            data:getallorders,
        })
    }catch(err){
        res.status(500).json({
            message:err.message,
        })
    }
}


const updatePaymentStatus = async (req, res) => {
  try {
    const { orderId, paymentStatus } = req.body;
    const updatedOrder = await ordersModel.findByIdAndUpdate(
      orderId,
      { paymentStatus, status: paymentStatus === "Paid" ? "Done" : "Pending" },
      { new: true }
    );
    res.status(200).json({ message: "Payment status updated", data: updatedOrder });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//razorpay 
const Razorpay = require("razorpay");

// Initialize Razorpay with your credentials
const razorpay = new Razorpay({
  key_id: process.env.key_id, 
  key_secret: process.env.key_secret, 
});

// Create Razorpay Order Function
const createRazorpayOrder = async (req, res) => {
  try {
    // Extract the amount from the request body (in INR)
    const { amount } = req.body;

    // Validate that the amount is a valid number
    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    // Razorpay order creation options
    const options = {
      amount: amount * 100, // Convert INR to paisa (Razorpay expects amount in paisa)
      currency: "INR", // Currency is INR
      receipt: `receipt_order_${Math.floor(Math.random() * 10000)}`, // Generate a unique receipt number
      payment_capture: 1, // Automatically capture payment once successful
    };

    // Create order with Razorpay API
    const order = await razorpay.orders.create(options);

    // Return the order details
    return res.status(200).json({
      orderId: order.id,
      amount: order.amount, // Amount in paisa
      currency: order.currency, // Currency (INR)
    });
  } catch (err) {
    console.error("Error creating Razorpay order:", err);
    return res.status(500).json({
      message: "Razorpay order creation failed",
      error: err.message, // Include the error message for debugging
    });
  }
};

// razorpay updatepaymentstatus
const updatePaymentStatusRazorpay = async (req, res) => {
  const { paymentId, orderId, status } = req.body;

  try {
    const order = await ordersModel.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update order status after payment
    order.status = status;
    order.paymentId = paymentId; // Store Razorpay payment ID
    await order.save();

    res.status(200).json({ success: true, message: "Order updated" });
  } catch (err) {
    res.status(500).json({ message: "Error updating payment status" });
  }
};

// Get Order Details by orderId
const getOrderDetails = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find the order by its ID
    const order = await ordersModel.findById(id)
      .populate("userId", "firstName lastName email number") // Populate user details if needed
      .populate("items.productId", "productName offerPrice quantity"); // Populate product details in the order

    if (!order) {
      return next(new ErrorHandler("Order not found", 404));
    }

    res.status(200).json({
      message: "Order details fetched successfully",
      data: order,
    });
  } catch (err) {
    next(err); // Pass the error to the global error handler
  }
};

module.exports = {
    addOrder,
    deleteOrder,
    getOrders,
    updatePaymentStatus,
    createRazorpayOrder,
    updatePaymentStatusRazorpay,
    getOrderDetails
}