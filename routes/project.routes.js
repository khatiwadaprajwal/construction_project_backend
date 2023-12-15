
const express = require('express');
const router = express.Router();
const { getAllProjects, getProjectById, deleteProjectById, updateProjectById, createNewProject } = require('../controllers/project.controller');

const body_parser = require('body-parser');
const parser = body_parser.json();

router.route("/project/getallproject")
  .get(getAllProjects);
router.route("/project/createproject") 
  .post(parser, createNewProject);
router.route("/project/getproject/:pId") 
   .get(getProjectById);
router.route("/project/updateproject/:upId") 
    .put(parser, updateProjectById);
router.route("/project/deleteproject/:dId")
   .delete(deleteProjectById);

module.exports = router;

