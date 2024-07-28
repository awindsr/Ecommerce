// controllers/productController.js

const Product = require('../models/Product');
const { validationResult } = require('express-validator');
const logger = require('../utils/logger');
const multer = require('multer');
const path = require('path');

// Set up storage for product images using multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/products/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage }).single('image');

// Create a new product
exports.createProduct = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      logger.error('Error uploading product image: ', err);
      return res.status(500).json({ msg: 'Error uploading image' });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const {
      name,
      description,
      price,
      category,
      sizes,
      colors,
      materials,
      stock,
    } = req.body;

    try {
      const product = new Product({
        name,
        description,
        price,
        category,
        sizes,
        colors,
        materials,
        stock,
        image: req.file ? req.file.path : null,
      });

      await product.save();
      res.json(product);
    } catch (error) {
      logger.error('Error creating product: ', error);
      res.status(500).json({ msg: 'Server error' });
    }
  });
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    logger.error('Error fetching products: ', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });

    res.json(product);
  } catch (error) {
    logger.error('Error fetching product by ID: ', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      logger.error('Error uploading product image: ', err);
      return res.status(500).json({ msg: 'Error uploading image' });
    }

    const { id } = req.params;
    const {
      name,
      description,
      price,
      category,
      sizes,
      colors,
      materials,
      stock,
    } = req.body;

    try {
      let product = await Product.findById(id);
      if (!product) return res.status(404).json({ msg: 'Product not found' });

      const updatedProductData = {
        name,
        description,
        price,
        category,
        sizes,
        colors,
        materials,
        stock,
        image: req.file ? req.file.path : product.image,
      };

      product = await Product.findByIdAndUpdate(id, updatedProductData, { new: true });
      res.json(product);
    } catch (error) {
      logger.error('Error updating product: ', error);
      res.status(500).json({ msg: 'Server error' });
    }
  });
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });

    await product.remove();
    res.json({ msg: 'Product deleted successfully' });
  } catch (error) {
    logger.error('Error deleting product: ', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Search products
exports.searchProducts = async (req, res) => {
  const { query, category, priceRange, colors, sizes } = req.body;

  try {
    const filters = {};

    if (query) filters.name = { $regex: query, $options: 'i' };
    if (category) filters.category = category;
    if (priceRange) filters.price = { $gte: priceRange.min, $lte: priceRange.max };
    if (colors) filters.colors = { $in: colors };
    if (sizes) filters.sizes = { $in: sizes };

    const products = await Product.find(filters);
    res.json(products);
  } catch (error) {
    logger.error('Error searching products: ', error);
    res.status(500).json({ msg: 'Server error' });
  }
};
