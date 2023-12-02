const express = require("express")
const app = express()


const auth_routes = require("./auth.routes")

app.use("/",auth_routes)

module.exports = app