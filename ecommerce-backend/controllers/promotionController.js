// controllers/promotionController.js

const Promotion = require('../models/Promotion');
const { validationResult } = require('express-validator');
const logger = require('../utils/logger');

// Create a new promotion code
exports.createPromotion = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { code, discount, validFrom, validTo, maxUsage, usedCount } = req.body;

  try {
    const existingPromotion = await Promotion.findOne({ code });
    if (existingPromotion) {
      return res.status(400).json({ msg: 'Promotion code already exists' });
    }

    const promotion = new Promotion({
      code,
      discount,
      validFrom,
      validTo,
      maxUsage,
      usedCount,
    });

    await promotion.save();
    res.json(promotion);
  } catch (error) {
    logger.error('Error creating promotion: ', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get all promotions
exports.getAllPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.find();
    res.json(promotions);
  } catch (error) {
    logger.error('Error fetching promotions: ', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get a promotion by ID
exports.getPromotionById = async (req, res) => {
  const { id } = req.params;

  try {
    const promotion = await Promotion.findById(id);
    if (!promotion) return res.status(404).json({ msg: 'Promotion not found' });

    res.json(promotion);
  } catch (error) {
    logger.error('Error fetching promotion by ID: ', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update a promotion
exports.updatePromotion = async (req, res) => {
  const { id } = req.params;
  const { code, discount, validFrom, validTo, maxUsage, usedCount } = req.body;

  try {
    let promotion = await Promotion.findById(id);
    if (!promotion) return res.status(404).json({ msg: 'Promotion not found' });

    promotion.code = code || promotion.code;
    promotion.discount = discount || promotion.discount;
    promotion.validFrom = validFrom || promotion.validFrom;
    promotion.validTo = validTo || promotion.validTo;
    promotion.maxUsage = maxUsage || promotion.maxUsage;
    promotion.usedCount = usedCount || promotion.usedCount;

    await promotion.save();
    res.json(promotion);
  } catch (error) {
    logger.error('Error updating promotion: ', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Delete a promotion
exports.deletePromotion = async (req, res) => {
  const { id } = req.params;

  try {
    const promotion = await Promotion.findById(id);
    if (!promotion) return res.status(404).json({ msg: 'Promotion not found' });

    await promotion.remove();
    res.json({ msg: 'Promotion deleted successfully' });
  } catch (error) {
    logger.error('Error deleting promotion: ', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Apply promotion code
exports.applyPromotion = async (req, res) => {
  const { code } = req.body;

  try {
    const promotion = await Promotion.findOne({ code });
    if (!promotion) return res.status(404).json({ msg: 'Promotion code not found' });

    const currentDate = new Date();

    if (currentDate < new Date(promotion.validFrom) || currentDate > new Date(promotion.validTo)) {
      return res.status(400).json({ msg: 'Promotion code is not valid at this time' });
    }

    if (promotion.maxUsage && promotion.usedCount >= promotion.maxUsage) {
      return res.status(400).json({ msg: 'Promotion code usage limit reached' });
    }

    promotion.usedCount += 1;
    await promotion.save();

    res.json({ discount: promotion.discount });
  } catch (error) {
    logger.error('Error applying promotion code: ', error);
    res.status(500).json({ msg: 'Server error' });
  }
};
