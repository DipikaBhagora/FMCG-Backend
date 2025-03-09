const cityModel = require("../models/CityModel")

//addcity
const addCity = async (req, res) => {
    try {
      const savedCity = await cityModel.create(req.body);
      res.status(201).json({
        message: "City added successfully",
        data: savedCity,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  //getallcities
  const getCities = async (req, res) => {
    try {
      const cities = await cityModel.find().populate("stateId");
      res.status(200).json({
        message: "All cities",
        data: cities,
      });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  };
 
//getcitybystateid
  const getCityByStateId = async (req, res) => {
    try {
      const cities = await cityModel.find({ stateId: req.params.stateId });
      res.status(200).json({
        message: "cities fetched of respective state",
        data: cities,
      });
    } catch (err) {
      res.status(500).json({
        message: "city  not found",
      });
    }
  };

  //getcitybyid
  const getCityById = async(req,res) =>{
    try{
      const getcity = await cityModel.findById(req.params.id);
      res.status(200).json({
        message:"city found",
        data: getcity
      })
    }catch(err){
      res.status(500).json({
        message: "city  not found",
      });
    }
  }
  
  //deletecity
  const deleteCity = async(req,res)=>{
    try{
        const deletedCity = await cityModel.findByIdAndDelete(req.params.id)
        res.json({
            message:"City deleted successfully..",
            Data:deletedCity
        })
    }catch(err){
        res.status(500).json({
            message: err
        })
    }
}

  module.exports = { addCity, getCities, getCityByStateId, getCityById, deleteCity};