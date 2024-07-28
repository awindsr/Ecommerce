// middleware/adminAuth.js

const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const User = require('../models/User');
const logger = require('../utils/logger');

// Middleware to verify JWT token and authenticate admin user
exports.authenticateAdmin = async (req, res, next) => {
  // Get the token from the header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, keys.jwtSecret);
    req.user = decoded.user;

    // Check if user is an admin
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied' });
    }

    next();
  } catch (err) {
    logger.error('Token verification or admin check failed: ', err);
    res.status(401).json({ msg: 'Token is not valid or user is not authorized' });
  }
};

// Middleware to verify specific admin permissions
exports.checkAdminPermission = (permissions) => async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied' });
    }

    if (!permissions.includes(user.permission)) {
      return res.status(403).json({ msg: 'You do not have the required permissions' });
    }

    next();
  } catch (err) {
    logger.error('Error checking admin permissions: ', err);
    res.status(500).json({ msg: 'Server error' });
  }
};
