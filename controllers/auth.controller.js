const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const register = async (req, res, next) => {
  // ... (unchanged)
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  // Check if username and password are provided
  if (!email || !password) {
    return res.status(400).json({
      message: "Username or Password not present",
    });
  }

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(400).json({
        message: "Login not successful",
        error: "Invalid credentials",
      });
    } else {
      if (!bcrypt.compare(password, user.password)) {
        res.status(401).json({
          msg: "Invalid credentials",
        });
      } else {
        const token = jwt.sign(
          { userId: user.userId, name: user.full_name, email: user.email },
          process.env.JWT_SECRET || 'fallback_secret'
        );
        res.json({
          msg: "You are logged in",
          user: { full_name: user.full_name, email: user.email },
          token: token,
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};

module.exports = { register, login };
