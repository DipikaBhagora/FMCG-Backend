const categoryModel = require("../models/CategoryModel")

//addcategory
const addCategory = async (req, res) => {
    try {
      const savedcategory = await categoryModel.create(req.body);
      res.status(201).json({
        message: "Category added successfully",
        data: savedcategory,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  //getallcategories
  const getCategories = async (req, res) => {
    try {
      const getcategories = await categoryModel.find()
      res.status(200).json({
        message: "All categories",
        data: getcategories,
      });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  };

  //getcategorybyid
  const getCategoryById = async(req,res) =>{
    try{
      const getcategorybyid = await categoryModel.findById(req.params.id);
      res.status(200).json({  
        message:"category found",
        data: getcategorybyid
      })
    }catch(err){
      res.status(500).json({
        message: "category not found",
      });
    }
  }
  
  //deletecategory
  const deleteCategory = async(req,res)=>{
    try{
        const deletedcategory = await categoryModel.findByIdAndDelete(req.params.id)
        res.json({
            message:"category deleted successfully..",
            Data:deletedcategory
        })
    }catch(err){
        res.status(500).json({
            message: err
        })
    }
}

//updatecategory
const updateCategory = async (req, res) => {
  try {
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );

    res.json({
      message: "Category updated successfully..",
      Data: updatedCategory,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};



  module.exports = { addCategory, getCategories, getCategoryById, deleteCategory, updateCategory};