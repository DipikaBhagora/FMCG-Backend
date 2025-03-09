const routes = require('express').Router();
const cityController = require('../controllers/CityController');

routes.post("/addcity", cityController.addCity);
routes.get("/getcities", cityController.getCities);
routes.delete("/deletecity/:id",cityController.deleteCity);
routes.get("/getcity/:id",cityController.getCityById);
routes.get("/getcitybystate/:stateId",cityController.getCityByStateId)

module.exports = routes;