const express = require('express');
const router = express.Router();
const { addMiscExpense,getMiscExpenseById, getAllMiscExpenses, updateMiscExpense, deleteMiscExpense } = require('../controllers/misc.controller');
const body_parser = require('body-parser');
const parser = body_parser.json();

router.route("/project/getallmiscexpenses")
  .get(getAllMiscExpenses);
router.route("/project/addmiscexpense") 
  .post(parser, addMiscExpense);
router.route("/project/getmiscexpense/:miscId") 
   .get(getMiscExpenseById);
router.route("/project/updatemiscexpense/:miscId") 
    .put(parser, updateMiscExpense);
router.route("/project/deletemiscexpense/:miscId")
   .delete(deleteMiscExpense);

module.exports = router;
