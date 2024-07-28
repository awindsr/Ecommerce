// routes/authroutes.js

const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const UserController = require('../controllers/userController');
const auth = require('../middleware/auth');
const { validateSignup, validateLogin, validatePasswordChange } = require('../middleware/validation');

// User authentication routes
router.post('/signup', validateSignup, AuthController.signup);
router.post('/login', validateLogin, AuthController.login);
router.post('/logout', auth, AuthController.logout);

// Password management
router.post('/password/change', auth, validatePasswordChange, AuthController.changePassword);

// Profile management routes
router.put('/email', auth, UserController.updateEmail);
router.put('/phone', auth, UserController.updatePhoneNumber);
router.put('/address', auth, UserController.manageAddress);
router.delete('/address/:addressId', auth, UserController.deleteAddress);

// View purchase history
router.get('/purchase-history', auth, UserController.getPurchaseHistory);

module.exports = router;
