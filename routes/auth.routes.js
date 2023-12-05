// routes/auth.routes.js

const express = require('express');
const router = express.Router();
const body_parser = require('body-parser');
const { register, login } = require('../controllers/auth.controller');
const { validateUserRegistration, validateUserLogin } = require('../middleware/validation');
const parser = body_parser.json();

router.route('/user/register').post(parser, validateUserRegistration, register);

router.route('/user/login').post(parser, validateUserLogin, login);

module.exports = router;

