// routes/promotionroutes.js

const express = require('express');
const router = express.Router();
const PromotionController = require('../controllers/promotionController');
const adminAuth = require('../middleware/adminauth');
const { validatePromotion } = require('../middleware/validation');

// Promotion management routes (Admin)

// Create a new promotion
router.post('/', adminAuth, validatePromotion, PromotionController.createPromotion);

// Get all promotions
router.get('/', adminAuth, PromotionController.getAllPromotions);

// Get a promotion by ID
router.get('/:id', adminAuth, PromotionController.getPromotionById);

// Update a promotion
router.put('/:id', adminAuth, validatePromotion, PromotionController.updatePromotion);

// Delete a promotion
router.delete('/:id', adminAuth, PromotionController.deletePromotion);

// Track promotion code usage
router.get('/track/:code', adminAuth, PromotionController.trackPromotionUsage);

module.exports = router;
