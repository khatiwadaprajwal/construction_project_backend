// controllers/auth.controller.js
const bcrypt=require("bcrypt")
const User = require('../models/user.model');
const jwt = require("jsonwebtoken");
require('dotenv').config();

const register = async (req, res) => {
  try {
  
    const newUser = await User.create(req.body);

   
    res.status(201).json({ message: 'Registration successful', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error during registration' });
  }
};

const login = async (req, res) => {
  try {
    
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({
        message: 'Login not successful',
        error: 'Invalid credentials',
      });
    }

    
    const passwordMatch = await bcrypt.compare(req.body.password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        msg: 'Invalid credentials',
      });
    }

    
    const token = jwt.sign(
      { userId: user.userId, name: user.full_name, email: user.email },
      process.env.JWT_SECRET || 'prajwal'
    );

    
    res.json({
      msg: 'You are logged in',
      user: { full_name: user.full_name, email: user.email },
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error during login' });
  }
};

module.exports = {
  register,
  login,
};
