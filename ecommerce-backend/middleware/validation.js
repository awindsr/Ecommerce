// middleware/validation.js

const { check, validationResult } = require('express-validator');

// Validation rules for user signup
exports.validateUserSignup = [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Validation rules for user login
exports.validateUserLogin = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Validation rules for creating a product
exports.validateProductCreation = [
  check('name', 'Product name is required').not().isEmpty(),
  check('price', 'Please include a valid price').isNumeric(),
  check('description', 'Description is required').not().isEmpty(),
  check('category', 'Category is required').not().isEmpty(),
  check('stock', 'Stock count is required').isInt({ min: 0 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Validation rules for updating a product
exports.validateProductUpdate = [
  check('name', 'Product name is required').optional().not().isEmpty(),
  check('price', 'Please include a valid price').optional().isNumeric(),
  check('description', 'Description is required').optional().not().isEmpty(),
  check('category', 'Category is required').optional().not().isEmpty(),
  check('stock', 'Stock count must be a non-negative integer').optional().isInt({ min: 0 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Validation rules for creating a promotion
exports.validatePromotionCreation = [
  check('code', 'Promotion code is required').not().isEmpty(),
  check('discount', 'Discount must be a percentage between 0 and 100').isFloat({ min: 0, max: 100 }),
  check('validFrom', 'Valid from date is required').isISO8601(),
  check('validTo', 'Valid to date is required').isISO8601(),
  check('maxUsage', 'Max usage must be a non-negative integer').isInt({ min: 0 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Validation rules for applying a promotion code
exports.validatePromotionApplication = [
  check('code', 'Promotion code is required').not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
