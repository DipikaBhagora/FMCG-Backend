const cartModel = require("../models/CartModel")

//addcart
const addCart = async(req,res) => {
//     try{
//         const addcart = await cartModel.create(req.body)
//         res.status(201).json({
//             message: "Cart added",
//             data: addcart,
//         }
//         )
//     }catch(err) {
//         res.status(500).json({
//             message:err.message,
//         })
//     }
// }
try {
    const { userId, productId, quantity } = req.body;

        //Check if product exists
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        //Check stock availability
        if (quantity > product.quantity) {
            return res.status(400).json({ message: "Not enough stock available" });
        }

        //Check if product already exists in the user's cart
        let cartItem = await cartModel.findOne({ userId, productId });

        if (cartItem) {
            // If product is already in cart, update quantity
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            // If not, create a new cart item
            cartItem = await cartModel.create({ userId, productId, quantity });
        }

        res.status(201).json({
            message: "Product added to cart",
            data: cartItem,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


//updatecart
const updateCart = async(req,res) => {
//     try{
//         const updatecart = await cartModel.findByIdAndUpdate(req.params.id, req.body, {new:true})
//         if (!updatecart) {
//             return res.status(404).json({ message: "Cart item not found" });
//         }
//         res.status(200).json({
//             message:"Cart updated",
//             data:updatecart
//         })
//     }catch(err) {
//         res.status(500).json({
//             message:err.message,
//         })
//     }
// }
try {
    const { quantity } = req.body;

    //Check if cart item exists
    let cartItem = await cartModel.findById(req.params.id);
    if (!cartItem) {
        return res.status(404).json({ message: "Cart item not found" });
    }

    //Check product stock availability
    const product = await productModel.findById(cartItem.productId);
    if (quantity > product.quantity) {
        return res.status(400).json({ message: "Not enough stock available" });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    res.status(200).json({
        message: "Cart updated",
        data: cartItem,
    });
} catch (err) {
    res.status(500).json({ message: err.message });
}
};


//deletecart
const deleteCart = async(req,res) => {
    try{
        const deletecart = await cartModel.findByIdAndDelete(req.params.id)
        if (!deletecart) {
            return res.status(404).json({ message: "Cart item not found" });
        }
        res.status(200).json({
            message:"Cart deleted",
            data:deletecart
        })
    }catch(err) {
        res.status(500).json({
            message:err.message,
        })
    }
}

//getcartbyuserid
const getCartByUserId = async(req,res) => {
    try{
        const cartitems = await cartModel.find({userId: req.params.userId}).populate("productId offerPrice productImages quantity", "productName").populate("userId", "firstName lastName email")
        res.status(200).json({
            message:"Cart is here",
            data:cartitems
        })
    }catch(err){
        res.status(500).json({
            message:err.message,
        })
    }
}

module.exports = {
    addCart,
    updateCart,
    deleteCart,
    getCartByUserId
}