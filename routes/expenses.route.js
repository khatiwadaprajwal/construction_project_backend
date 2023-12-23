
const express = require('express');
const router = express.Router();
const { getAllExpenses,getExpenseById,addExpense,updateExpenseById,deleteExpenseById } = require('../controllers/expense.controller');
const body_parser = require('body-parser');
const parser = body_parser.json();

router.route("/project/getallexpenses")
  .get(getAllExpenses);
router.route("/project/addexpense") 
  .post(parser, addExpense);
router.route("/project/getexpense/:eId") 
   .get(getExpenseById);
router.route("/project/updateexpense/:uId") 
    .put(parser, updateExpenseById);
router.route("/project/deleteexpense/:dId")
   .delete(deleteExpenseById);

module.exports = router;

