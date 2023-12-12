const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
require('dotenv').config();

const verifyAccessToken = async (req, res, next) => {
  const accessToken = req.headers['authorization'];

  if (!accessToken) {
    return res.status(401).json({ msg: "Unauthorized access - Access token missing" });
  }

  try {
    const data = jwt.verify(accessToken, process.env.JWT_SECRET || 'prajwal');

    if (!data) {
      return res.status(401).json({ msg: "Unauthorized access - Invalid access token" });
    }

    // Attach user data to the request
    req.auth_user = data;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Error in verifyAccessToken middleware:', error);
    res.status(401).json({ msg: "Unauthorized access - Invalid access token" });
  }
};

const regenerateAccessToken = async (req, res, next) => {
  const refreshToken = req.headers['refresh-token'];

  if (!refreshToken) {
    return res.status(401).json({ msg: "Unauthorized access - Refresh token missing" });
  }

  try {
    const data = jwt.verify(refreshToken, process.env.JWT_SECRET || 'prajwal');

    if (!data) {
      return res.status(401).json({ msg: "Unauthorized access - Invalid refresh token" });
    }

    const user = await User.findById(data.userId);

    if (!user) {
      return res.status(401).json({ msg: "Unauthorized access - User not found" });
    }

    // Regenerate access token with a new expiration time
    const newAccessToken = jwt.sign(
      { userId: user.userId, name: user.full_name, email: user.email },
      process.env.JWT_SECRET || 'prajwal',
      { expiresIn: '15m' }
    );

    // Attach the new access token to the request
    req.auth_user = { ...data, accessToken: newAccessToken };

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Error in regenerateAccessToken middleware:', error);
    res.status(401).json({ msg: "Unauthorized access - Invalid refresh token" });
  }
};

module.exports = {
  verifyAccessToken,
  regenerateAccessToken,
};
