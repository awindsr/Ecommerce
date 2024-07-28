// routes/orderroutes.js

const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminauth');

// Order creation and management routes

// User routes
router.post('/', auth, OrderController.createOrder);
router.get('/', auth, OrderController.getUserOrders);
router.get('/:id', auth, OrderController.getOrderById);
router.put('/:id/cancel', auth, OrderController.cancelOrder);

// Admin routes
router.get('/admin/all', adminAuth, OrderController.getAllOrders);
router.get('/admin/:id', adminAuth, OrderController.getOrderByIdAdmin);
router.put('/admin/:id/status', adminAuth, OrderController.updateOrderStatus);
router.delete('/admin/:id', adminAuth, OrderController.deleteOrder);

module.exports = router;
