// controllers/userController.js

const User = require('../models/User');
const { validationResult } = require('express-validator');
const logger = require('../utils/logger');

// Get user profile
exports.getUserProfile = async (req, res) => {
  const { userId } = req.user;

  try {
    const user = await User.findById(userId).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });

    res.json(user);
  } catch (error) {
    logger.error('Error fetching user profile: ', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  const { userId } = req.user;
  const { name, email, phone } = req.body;

  try {
    let user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;

    await user.save();
    res.json(user);
  } catch (error) {
    logger.error('Error updating user profile: ', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Add address
exports.addAddress = async (req, res) => {
  const { userId } = req.user;
  const { address } = req.body;

  try {
    let user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.addresses.push(address);
    await user.save();

    res.json(user.addresses);
  } catch (error) {
    logger.error('Error adding address: ', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update address
exports.updateAddress = async (req, res) => {
  const { userId } = req.user;
  const { addressId, updatedAddress } = req.body;

  try {
    let user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const address = user.addresses.id(addressId);
    if (!address) return res.status(404).json({ msg: 'Address not found' });

    address.set(updatedAddress);
    await user.save();

    res.json(user.addresses);
  } catch (error) {
    logger.error('Error updating address: ', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Delete address
exports.deleteAddress = async (req, res) => {
  const { userId } = req.user;
  const { addressId } = req.params;

  try {
    let user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.addresses.id(addressId).remove();
    await user.save();

    res.json(user.addresses);
  } catch (error) {
    logger.error('Error deleting address: ', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get user wishlist
exports.getWishlist = async (req, res) => {
  const { userId } = req.user;

  try {
    const user = await User.findById(userId).populate('wishlist');
    if (!user) return res.status(404).json({ msg: 'User not found' });

    res.json(user.wishlist);
  } catch (error) {
    logger.error('Error fetching wishlist: ', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Add to wishlist
exports.addToWishlist = async (req, res) => {
  const { userId } = req.user;
  const { productId } = req.body;

  try {
    let user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    if (user.wishlist.includes(productId)) {
      return res.status(400).json({ msg: 'Product already in wishlist' });
    }

    user.wishlist.push(productId);
    await user.save();

    res.json(user.wishlist);
  } catch (error) {
    logger.error('Error adding to wishlist: ', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Remove from wishlist
exports.removeFromWishlist = async (req, res) => {
  const { userId } = req.user;
  const { productId } = req.body;

  try {
    let user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.wishlist = user.wishlist.filter((item) => item.toString() !== productId);
    await user.save();

    res.json(user.wishlist);
  } catch (error) {
    logger.error('Error removing from wishlist: ', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get user cart
exports.getCart = async (req, res) => {
  const { userId } = req.user;

  try {
    const user = await User.findById(userId).populate('cart.product');
    if (!user) return res.status(404).json({ msg: 'User not found' });

    res.json(user.cart);
  } catch (error) {
    logger.error('Error fetching cart: ', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Add to cart
exports.addToCart = async (req, res) => {
  const { userId } = req.user;
  const { productId, quantity } = req.body;

  try {
    let user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const cartItem = user.cart.find((item) => item.product.toString() === productId);
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity });
    }

    await user.save();
    res.json(user.cart);
  } catch (error) {
    logger.error('Error adding to cart: ', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Remove from cart
exports.removeFromCart = async (req, res) => {
  const { userId } = req.user;
  const { productId } = req.body;

  try {
    let user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.cart = user.cart.filter((item) => item.product.toString() !== productId);
    await user.save();

    res.json(user.cart);
  } catch (error) {
    logger.error('Error removing from cart: ', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update cart item quantity
exports.updateCartItem = async (req, res) => {
  const { userId } = req.user;
  const { productId, quantity } = req.body;

  try {
    let user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const cartItem = user.cart.find((item) => item.product.toString() === productId);
    if (cartItem) {
      cartItem.quantity = quantity;
      await user.save();
      res.json(user.cart);
    } else {
      res.status(404).json({ msg: 'Product not found in cart' });
    }
  } catch (error) {
    logger.error('Error updating cart item: ', error);
    res.status(500).json({ msg: 'Server error' });
  }
};
