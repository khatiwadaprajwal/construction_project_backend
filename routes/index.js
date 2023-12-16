const express = require("express")
const app = express()


const auth_routes = require("./auth.routes")
const user_routes =require("./user.routes")
const project_routes=require("./project.routes")
const Expense_routes=require("./expenses.route")

app.use("/",auth_routes)
app.use("/", user_routes)
app.use("/", project_routes)
app.use("/",Expense_routes)



module.exports = app