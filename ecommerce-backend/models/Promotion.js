// models/promotion.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Promotion Schema
const PromotionSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  discountType: {
    type: String,
    enum: ['percentage', 'fixed'],
    required: true
  },
  discountValue: {
    type: Number,
    required: true,
    min: 0
  },
  minPurchaseAmount: {
    type: Number,
    default: 0
  },
  maxDiscountAmount: {
    type: Number
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  usageLimit: {
    type: Number,
    default: 0 // 0 means unlimited usage
  },
  usageCount: {
    type: Number,
    default: 0
  },
  applicableCategories: {
    type: [String],
    default: []
  },
  applicableProducts: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
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

// Index for faster querying by code
PromotionSchema.index({ code: 1 });

// Pre-save middleware to update the updatedAt field
PromotionSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Method to check if the promotion is valid
PromotionSchema.methods.isValid = function () {
  const now = new Date();
  return this.startDate <= now && this.endDate >= now && (this.usageLimit === 0 || this.usageCount < this.usageLimit);
};

// Export the model
module.exports = mongoose.model('Promotion', PromotionSchema);
