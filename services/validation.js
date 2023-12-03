// services/validation.js

const Joi = require('joi');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');

const userRegistrationSchema = Joi.object({
  full_name: Joi.string().required(),
  email: Joi.string().email().required(),
  phno: Joi.string().pattern(/^[0-9]{10}$/).required(),
  password: Joi.string().min(8).required(),
  isadmin: Joi.boolean(),
});

const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validateUserRegistration = async (req, res, next) => {
  try {
    const validationResult = userRegistrationSchema.validate(req.body);

    if (validationResult.error) {
      return res.status(400).json({ error: validationResult.error.details[0].message });
    }

    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;

    return next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const validateUserLogin = async (req, res, next) => {
  try {
    const validationResult = userLoginSchema.validate(req.body);

    if (validationResult.error) {
      return res.status(400).json({ error: validationResult.error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

   
    const passwordMatch = await bcrypt.compare(req.body.password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    
    req.user = user;
    return next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  validateUserRegistration,
  validateUserLogin,
};
