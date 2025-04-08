const contactusModel = require("../models/ContactUsModel")

//getallmessages
const getAllMessages = async(req,res) =>{
    try {
        const messages = await contactusModel.find();
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: "Error fetching messages", error });
    }
}

//addmessages
const addMessages = async(req,res) =>{
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newMessage = new contactusModel({
            name,
            email,
            message,
        });

        await newMessage.save();
        res.status(201).json({ message: "Message submitted successfully", data: newMessage });
    } catch (error) {
        res.status(500).json({ message: "Error submitting message", error });
    }
}

//deletemessages
const deleteMessages = async(req,res) =>{
    try {
        const { id } = req.params;

        const deletedMessage = await contactusModel.findByIdAndDelete(id);

        if (!deletedMessage) {
            return res.status(404).json({ message: "Message not found" });
        }

        res.status(200).json({ message: "Message deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting message", error });
    }
}

module.exports = {
    getAllMessages,
    addMessages,
    deleteMessages
}