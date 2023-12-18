const express = require('express');
const router = express.Router();
const { getAllReceivedRecords, getReceivedRecordById, createNewReceivedRecord, updateReceivedRecord, deleteReceivedRecord } = require('../controllers/cashreceived.controller');
const bodyParser = require('body-parser');
const parser = bodyParser.json();

router.route("/project/getallcashreceivedrecords")
    .get(getAllReceivedRecords);
router.route("/project/createcashreceivedrecord")
    .post(parser, createNewReceivedRecord);
router.route("/project/getcashreceivedrecord/:cashid")
    .get(getReceivedRecordById);
router.route("/project/updatecashreceivedrecord/:cashid")
    .put(parser, updateReceivedRecord);
router.route("/project/deletecashreceivedrecord/:cashid")
    .delete(deleteReceivedRecord);

module.exports = router;
