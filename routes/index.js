const express = require("express")
const app = express()


const auth_routes = require("./auth.routes")
const user_routes =require("./user.routes")
const project_routes=require("./project.routes")
const Expense_routes=require("./expenses.route")
const Misc_routes=require("./misc.routes")
const Received_routes=require("./cashreceivedroutes")
const Salary_routes=require('./salary.routes')

app.use("/",auth_routes)
app.use("/", user_routes)
app.use("/", project_routes)
app.use("/",Expense_routes)
app.use("/",Misc_routes)
app.use("/",Received_routes)
app.use("/",Salary_routes)


module.exports = app