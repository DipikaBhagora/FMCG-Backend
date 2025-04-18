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

//stateRoutes
const stateRoutes = require("./src/routes/StateRoutes")
app.use("/state",stateRoutes) //http://localhost:3000/state/addState

//cityRoutes
const cityRoutes = require("./src/routes/CityRoutes")
app.use("/city",cityRoutes)

//categoryRoutes
const categoryRoutes = require("./src/routes/CategoryRoutes")
app.use("/category",categoryRoutes)

//subcategoryRoutes
const subcategoryRoutes = require("./src/routes/SubCategoryRoutes")
app.use("/subcategory",subcategoryRoutes)

//productRoutes
const productRoutes = require("./src/routes/ProductRoutes")
app.use("/product",productRoutes)

//userAddresRoutes
const userAddressRoutes = require("./src/routes/UserAddressRoutes")
app.use("/address",userAddressRoutes)

//cartRoutes
const cartRoutes = require("./src/routes/CartRoutes")
app.use("/cart",cartRoutes)

//ordersRoutes
const ordersRoutes = require("./src/routes/OrdersRoutes")
app.use("/orders",ordersRoutes)

//contactUs
const contactusRoutes = require("./src/routes/ContactUsRoutes")
app.use("/contactus",contactusRoutes)

//admindashboard
const admindashboardRoutes = require("./src/routes/AdminDashboardRoutes")
app.use("/admin",admindashboardRoutes)


mongoose.connect("mongodb://localhost:27017/25_node_internship").then(() =>{
    console.log("database connected...")
})

//server connnection
const PORT = 3000
app.listen(PORT,()=>{
    console.log("server started on port number ",PORT)
})