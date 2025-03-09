const stateModel = require("../models/StateModel")

//addstate
const addState = async (req, res) => {
    try {
      const savedState = await stateModel.create(req.body);
      res.status(201).json({
        message: "State added successfully",
        data: savedState,
      });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  };
  //getallstates
  const getAllStates = async (req, res) => {
      try{
          const states = await stateModel.find();
          res.status(200).json({
              message: "All states fetched successfully",
              data: states
          })
      }catch(err){
          res.status(500).json({
              message: err
          })
      }
  }
  //deletestate
  const deleteState = async(req,res)=>{
    try{
        const deletedState = await stateModel.findByIdAndDelete(req.params.id)
        res.json({
            message:"state deleted successfully..",
            Data:deletedState
        })
    }catch(err){
        res.status(500).json({
            message: err
        })
    }
}
  //getstatebyid
  const getStateById = async(req,res)=>{
    try{
        const foundState = await stateModel.findById(req.params.id)
        res.json({
            message:"Respective state fetched..",
            data:foundState
        })
    }catch(err){
        res.status(500).json({
            message: err
        })
    }  
  }
  module.exports = {
      addState,
      getAllStates,
      deleteState,
      getStateById
  }