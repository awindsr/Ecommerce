// middleware/auth.js

const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const User = require('../models/User');
const logger = require('../utils/logger');

// Middleware to verify JWT and authenticate user
exports.verifyToken = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, keys.jwtSecret);
    req.user = decoded;

    // Check if user still exists
    const user = await User.findById(req.user.id);
    if (!user) return res.status(401).json({ msg: 'User no longer exists' });

    next();
  } catch (error) {
    logger.error('Token verification error: ', error);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// Middleware to check if user is an admin
exports.isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user && user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ msg: 'Access denied, admin only' });
    }
  } catch (error) {
    logger.error('Admin check error: ', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Middleware to check specific permissions
exports.hasPermission = (requiredPermissions) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ msg: 'User not found' });

      const userPermissions = user.permissions || [];
      const hasAllPermissions = requiredPermissions.every((perm) =>
        userPermissions.includes(perm)
      );

      if (hasAllPermissions) {
        next();
      } else {
        res.status(403).json({ msg: 'Access denied, insufficient permissions' });
      }
    } catch (error) {
      logger.error('Permission check error: ', error);
      res.status(500).json({ msg: 'Server error' });
    }
  };
};
