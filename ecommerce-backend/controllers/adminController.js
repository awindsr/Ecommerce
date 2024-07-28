// controllers/adminController.js

const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const { ActivityLog } = require('../models/ActivityLog');
const Promotion = require('../models/Promotion');
const { validationResult } = require('express-validator');
const logger = require('../utils/logger');

// Admin login
exports.login = async (req, res) => {
  // Implementation of admin login
};

// Permissions management
exports.updatePermissions = async (req, res) => {
  try {
    const { userId, permissions } = req.body;
    const user = await User.findByIdAndUpdate(userId, { permissions }, { new: true });
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user);
  } catch (error) {
    logger.error('Error updating permissions: ', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// View all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    logger.error('Error fetching users: ', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update user information
exports.updateUser = async (req, res) => {
  try {
    const { userId, updateData } = req.body;
    const user = await User.findByIdAndUpdate(userId, updateData, { new: true }).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user);
  } catch (error) {
    logger.error('Error updating user: ', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndDelete(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json({ msg: 'User deleted' });
  } catch (error) {
    logger.error('Error deleting user: ', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// View all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email');
    res.json(orders);
  } catch (error) {
    logger.error('Error fetching orders: ', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    if (!order) return res.status(404).json({ msg: 'Order not found' });
    res.json(order);
  } catch (error) {
    logger.error('Error updating order status: ', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// View user activities
exports.getUserActivities = async (req, res) => {
  try {
    const activities = await ActivityLog.find().populate('user', 'name email');
    res.json(activities);
  } catch (error) {
    logger.error('Error fetching user activities: ', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Manage promotions
exports.createPromotion = async (req, res) => {
  try {
    const { code, discount, expirationDate } = req.body;
    const promotion = new Promotion({ code, discount, expirationDate });
    await promotion.save();
    res.json(promotion);
  } catch (error) {
    logger.error('Error creating promotion: ', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.updatePromotion = async (req, res) => {
  try {
    const { promoId, updateData } = req.body;
    const promotion = await Promotion.findByIdAndUpdate(promoId, updateData, { new: true });
    if (!promotion) return res.status(404).json({ msg: 'Promotion not found' });
    res.json(promotion);
  } catch (error) {
    logger.error('Error updating promotion: ', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.deletePromotion = async (req, res) => {
  try {
    const { promoId } = req.params;
    const promotion = await Promotion.findByIdAndDelete(promoId);
    if (!promotion) return res.status(404).json({ msg: 'Promotion not found' });
    res.json({ msg: 'Promotion deleted' });
  } catch (error) {
    logger.error('Error deleting promotion: ', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Product management (CRUD)
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, categories, sizes, colors, materials } = req.body;
    const product = new Product({ name, description, price, stock, categories, sizes, colors, materials });
    await product.save();
    res.json(product);
  } catch (error) {
    logger.error('Error creating product: ', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { productId, updateData } = req.body;
    const product = await Product.findByIdAndUpdate(productId, updateData, { new: true });
    if (!product) return res.status(404).json({ msg: 'Product not found' });
    res.json(product);
  } catch (error) {
    logger.error('Error updating product: ', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findByIdAndDelete(productId);
    if (!product) return res.status(404).json({ msg: 'Product not found' });
    res.json({ msg: 'Product deleted' });
  } catch (error) {
    logger.error('Error deleting product: ', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ msg: 'Product not found' });
    res.json(product);
  } catch (error) {
    logger.error('Error fetching product: ', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    logger.error('Error fetching products: ', error);
    res.status(500).json({ msg: 'Server error' });
  }
};
