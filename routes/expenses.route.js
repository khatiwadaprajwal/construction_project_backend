
const express = require('express');
const router = express.Router();
const { getAllExpenses,getExpenseById,addExpense,updateExpenseById,deleteExpenseById } = require('../controllers/expense.model');
const body_parser = require('body-parser');
const parser = body_parser.json();


router.route("/project/addexpense") 
  .post(parser, addExpense);

module.exports = router;

