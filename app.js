const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

//express obj
const app = express()
app.use(express.json()) //to accept data as json
app.use(cors())

//roleRoutes
const roleRoutes = require("./src/routes/RoleRoutes")
app.use(roleRoutes)

//userRoutes
const userRoutes = require("./src/routes/UserRoutes")
app.use(userRoutes)

mongoose.connect("mongodb://localhost:27017/25_node_internship").then(() =>{
    console.log("database connected...")
})

//server connnection
const PORT = 3000
app.listen(PORT,()=>{
    console.log("server started on port number ",PORT)
})