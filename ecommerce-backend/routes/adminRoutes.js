// routes/adminroute.js

const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminauth');
const AdminController = require('../controllers/adminController');
const ProductController = require('../controllers/productController');
const OrderController = require('../controllers/orderController');
const UserController = require('../controllers/userController');
const PromotionController = require('../controllers/promotionController');

// Admin authentication routes
router.post('/login', AdminController.login);
router.post('/logout', adminAuth, AdminController.logout);

// Admin user management routes
router.get('/users', adminAuth, AdminController.getAllUsers);
router.get('/users/:id', adminAuth, AdminController.getUserById);
router.put('/users/:id', adminAuth, AdminController.updateUser);
router.delete('/users/:id', adminAuth, AdminController.deleteUser);

// Admin product management routes
router.post('/products', adminAuth, ProductController.createProduct);
router.get('/products', ProductController.getAllProducts);
router.get('/products/:id', ProductController.getProductById);
router.put('/products/:id', adminAuth, ProductController.updateProduct);
router.delete('/products/:id', adminAuth, ProductController.deleteProduct);

// Admin order management routes
router.get('/orders', adminAuth, OrderController.getAllOrders);
router.get('/orders/:id', adminAuth, OrderController.getOrderById);
router.put('/orders/:id', adminAuth, OrderController.updateOrderStatus);
router.delete('/orders/:id', adminAuth, OrderController.deleteOrder);

// Admin promotion management routes
router.post('/promotions', adminAuth, PromotionController.createPromotion);
router.get('/promotions', adminAuth, PromotionController.getAllPromotions);
router.get('/promotions/:id', adminAuth, PromotionController.getPromotionById);
router.put('/promotions/:id', adminAuth, PromotionController.updatePromotion);
router.delete('/promotions/:id', adminAuth, PromotionController.deletePromotion);

// Admin activity log routes
router.get('/activitylogs', adminAuth, AdminController.getActivityLogs);

// Admin reports routes
router.get('/reports', adminAuth, AdminController.getReports);

module.exports = router;
