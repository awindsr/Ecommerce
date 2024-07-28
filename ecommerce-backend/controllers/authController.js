// controllers/authController.js

const User = require('../models/User');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/keys');
const { validationResult } = require('express-validator');
const logger = require('../utils/logger');

// Helper function to generate JWT
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
};

// User signup
exports.signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, email, password, phone } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({
      name,
      email,
      password,
      phone,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    logger.error('Error during user signup: ', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// User login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    logger.error('Error during user login: ', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Admin login
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = generateToken(admin);
    res.json({ token });
  } catch (error) {
    logger.error('Error during admin login: ', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Change password
exports.changePassword = async (req, res) => {
  const { userId } = req.user;
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Current password is incorrect' });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ msg: 'Password updated successfully' });
  } catch (error) {
    logger.error('Error changing password: ', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Change email
exports.changeEmail = async (req, res) => {
  const { userId } = req.user;
  const { newEmail } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const existingUser = await User.findOne({ email: newEmail });
    if (existingUser) return res.status(400).json({ msg: 'Email is already taken' });

    user.email = newEmail;
    await user.save();

    res.json({ msg: 'Email updated successfully' });
  } catch (error) {
    logger.error('Error changing email: ', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Change phone number
exports.changePhone = async (req, res) => {
  const { userId } = req.user;
  const { newPhone } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.phone = newPhone;
    await user.save();

    res.json({ msg: 'Phone number updated successfully' });
  } catch (error) {
    logger.error('Error changing phone number: ', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Address management (add, update, delete)
exports.addAddress = async (req, res) => {
  const { userId } = req.user;
  const { address } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.addresses.push(address);
    await user.save();

    res.json({ msg: 'Address added successfully', addresses: user.addresses });
  } catch (error) {
    logger.error('Error adding address: ', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.updateAddress = async (req, res) => {
  const { userId } = req.user;
  const { addressId, updatedAddress } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const address = user.addresses.id(addressId);
    if (!address) return res.status(404).json({ msg: 'Address not found' });

    address.set(updatedAddress);
    await user.save();

    res.json({ msg: 'Address updated successfully', addresses: user.addresses });
  } catch (error) {
    logger.error('Error updating address: ', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.deleteAddress = async (req, res) => {
  const { userId } = req.user;
  const { addressId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.addresses.id(addressId).remove();
    await user.save();

    res.json({ msg: 'Address deleted successfully', addresses: user.addresses });
  } catch (error) {
    logger.error('Error deleting address: ', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// View purchase history
exports.getPurchaseHistory = async (req, res) => {
  const { userId } = req.user;

  try {
    const user = await User.findById(userId).populate('orders');
    if (!user) return res.status(404).json({ msg: 'User not found' });

    res.json(user.orders);
  } catch (error) {
    logger.error('Error fetching purchase history: ', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Logout (client-side should handle token removal)
exports.logout = (req, res) => {
  res.json({ msg: 'Logged out successfully' });
};
