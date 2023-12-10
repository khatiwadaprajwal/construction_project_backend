
const express = require('express');
const router = express.Router();
const body_parser = require('body-parser');
const {getAllUsers,getUserById,deleteUserById,updateUserById} = require('../controllers/user.controller');
const isLoggedIn = require("../middleware/islogin.middleware")
const isAdmin=require("../middleware/rbac.middleware")

const parser = body_parser.json();

router.route("/user/getAllUsers")
    .get(isLoggedIn,isAdmin,getAllUsers)
router.route("/user/updateuser/:userId")
    .put(parser,isLoggedIn,isAdmin,updateUserById)
router.route("/user/getuser/:userId")
   .get(getUserById)
   router.route("/user/getuser/:userId")
   .delete(isLoggedIn,isAdmin,deleteUserById)

    




module.exports = router;

