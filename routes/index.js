const express = require("express")
const app = express()


const auth_routes = require("./auth.routes")
const user_routes =require("./user.routes")

app.use("/",auth_routes)
app.use("/", user_routes)


module.exports = app