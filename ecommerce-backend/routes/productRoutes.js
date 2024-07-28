// routes/productroutes.js

const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');
const adminAuth = require('../middleware/adminauth');
const { validateProduct } = require('../middleware/validation');

// Product management routes

// Admin routes
router.post('/', adminAuth, validateProduct, ProductController.createProduct);
router.put('/:id', adminAuth, validateProduct, ProductController.updateProduct);
router.delete('/:id', adminAuth, ProductController.deleteProduct);

// Public routes
router.get('/', ProductController.getAllProducts);
router.get('/search', ProductController.searchProducts);
router.get('/:id', ProductController.getProductById);

// Product attribute management (admin)
router.post('/categories', adminAuth, ProductController.createCategory);
router.put('/categories/:id', adminAuth, ProductController.updateCategory);
router.delete('/categories/:id', adminAuth, ProductController.deleteCategory);

router.post('/sizes', adminAuth, ProductController.createSize);
router.put('/sizes/:id', adminAuth, ProductController.updateSize);
router.delete('/sizes/:id', adminAuth, ProductController.deleteSize);

router.post('/colors', adminAuth, ProductController.createColor);
router.put('/colors/:id', adminAuth, ProductController.updateColor);
router.delete('/colors/:id', adminAuth, ProductController.deleteColor);

// Additional product-related routes
router.post('/upload', adminAuth, ProductController.uploadProductImages);
router.get('/collections', ProductController.getCollections);
router.get('/materials', ProductController.getMaterials);

module.exports = router;
