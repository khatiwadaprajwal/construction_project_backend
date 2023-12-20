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
    // Assuming user validation has already been performed using middleware like 'joi'

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({
        message: 'Login not successful',
        error: 'Invalid credentials',
      });
    }

    // Assuming password validation and authentication have been performed

    // Generate access token with a short expiration time (e.g., 15 minutes)
    const accessToken = jwt.sign(
      { userId: user.userId, email: user.email },
      process.env.JWT_SECRET || 'prajwal',
      { expiresIn: '15m' }
    );

    // Generate refresh token with a long expiration time (e.g., 7 days)
    const refreshToken = jwt.sign(
      { userId: user.userId, email: user.email },
      process.env.JWT_SECRET || 'prajwal',
      { expiresIn: '7d' }
    );

    // Save the refresh token securely on the server-side (not sent to the client)
    // You might want to store this in a database associated with the user

    res.json({
      msg: 'You are logged in',
      user: { full_name: user.full_name, email: user.email },
      accessToken,
      //  not expose the refresh token to the client
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