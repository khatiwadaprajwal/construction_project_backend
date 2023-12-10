const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
require('dotenv').config();

const isLoggedIn = async (req, res, next) => {
  try {
    let token = req.headers['authorization'];

    if (!token) {
      return res.status(401).json({ msg: "Unauthorized access - Token missing" });
    }

    let data = jwt.verify(token, process.env.JWT_SECRET || 'prajwal');
    
    if (!data) {
      return res.status(401).json({ msg: "Unauthorized access - Invalid token" });
    }

    let user = await User.findById(data.id);

    if (!user) {
      return res.status(401).json({ msg: "Unauthorized access - User not found" });
    }

    req.auth_user = user;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Error in isLoggedIn middleware:', error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = isLoggedIn;
