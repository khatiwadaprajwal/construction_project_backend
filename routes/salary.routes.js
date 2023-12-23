const express = require('express');
const router = express.Router();
const { addSalary, getSalaryById, getAllSalaries, updateSalaryById, deleteSalaryById } = require('../controllers/salary.controller');
const body_parser = require('body-parser');
const parser = body_parser.json();

router.route("/project/getallsalaries")
  .get(getAllSalaries);
router.route("/project/addsalary") 
  .post(parser, addSalary);
router.route("/project/getsalary/:sId") 
   .get(getSalaryById);
router.route("/project/updatesalary/:uId") 
    .put(parser, updateSalaryById);
router.route("/project/deletesalary/:dId")
   .delete(deleteSalaryById);

module.exports = router;
