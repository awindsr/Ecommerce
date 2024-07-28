// models/wishlist.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Wishlist Schema
const WishlistSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index to ensure unique wishlist per user
WishlistSchema.index({ user: 1 }, { unique: true });

// Pre-save middleware to update the updatedAt field
WishlistSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Method to add a product to the wishlist
WishlistSchema.methods.addProduct = async function(productId) {
  if (!this.products.includes(productId)) {
    this.products.push(productId);
    await this.save();
  }
  return this;
};

// Method to remove a product from the wishlist
WishlistSchema.methods.removeProduct = async function(productId) {
  this.products = this.products.filter(product => product.toString() !== productId.toString());
  await this.save();
  return this;
};

// Export the model
module.exports = mongoose.model('Wishlist', WishlistSchema);
