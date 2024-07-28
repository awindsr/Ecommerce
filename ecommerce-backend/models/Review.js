// models/review.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Review Schema
const ReviewSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster querying by product and user
ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

// Pre-save middleware to update the updatedAt field
ReviewSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Static method to calculate the average rating for a product
ReviewSchema.statics.calculateAverageRating = async function (productId) {
  const stats = await this.aggregate([
    { $match: { product: productId } },
    { $group: { _id: '$product', averageRating: { $avg: '$rating' }, ratingCount: { $sum: 1 } } }
  ]);
  try {
    await mongoose.model('Product').findByIdAndUpdate(productId, {
      ratings: {
        average: stats[0] ? stats[0].averageRating : 0,
        count: stats[0] ? stats[0].ratingCount : 0
      }
    });
  } catch (error) {
    console.error('Error updating product rating:', error);
  }
};

// Post-save hook to recalculate average rating after each review save
ReviewSchema.post('save', function () {
  this.constructor.calculateAverageRating(this.product);
});

// Post-remove hook to recalculate average rating after a review is removed
ReviewSchema.post('remove', function () {
  this.constructor.calculateAverageRating(this.product);
});

// Export the model
module.exports = mongoose.model('Review', ReviewSchema);
