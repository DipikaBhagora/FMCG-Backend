const subcategoryModel = require("../models/SubCategoryModel")

//addsubcategory
const addSubcategory = async (req, res) => {
    try {
      const savedSubcategory = await subcategoryModel.create(req.body);
      res.status(201).json({
        message: "Sub-Category added successfully",
        data: savedSubcategory,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  //getallsubcategories
  const getSubcategories = async (req, res) => {
    try {
      const getsubcategories = await subcategoryModel.find().populate("categoryId");
      res.status(200).json({
        message: "All subcategories",
        data: getsubcategories,
      });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  };
 
//getsucategorybycategoryid
  const getSubCategoryByCategoryId = async (req, res) => {
    try {
      const subcategoriesbycategoriesid = await subcategoryModel.find({ categoryId: req.params.categoryId });
      res.status(200).json({
        message: "sub-categories fetched of respective category",
        data: subcategoriesbycategoriesid,
      });
    } catch (err) {
      res.status(500).json({
        message: "sub category not found",
      });
    }
  };

  //getsubcategorybyid
  const getSubCategoryById = async(req,res) =>{
    try{
      const getsubcategorybyid = await subcategoryModel.findById(req.params.id);
      res.status(200).json({
        message:"sub category found",
        data: getsubcategorybyid
      })
    }catch(err){
      res.status(500).json({
        message: "sub category not found",
      });
    }
  }
  
  //deletesubcategory
  const deletesubcategory = async(req,res)=>{
    try{
        const deletedsubcategory = await subcategoryModel.findByIdAndDelete(req.params.id)
        res.json({
            message:"sub category deleted successfully..",
            Data:deletedsubcategory
        })
    }catch(err){
        res.status(500).json({
            message: err
        })
    }
}

  module.exports = { addSubcategory, getSubcategories, getSubCategoryByCategoryId, getSubCategoryById, deletesubcategory};