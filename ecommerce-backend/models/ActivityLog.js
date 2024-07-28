// models/activityLog.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Activity Log Schema
const ActivityLogSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  activityType: {
    type: String,
    required: true,
    enum: ['login', 'logout', 'purchase', 'review', 'add_to_cart', 'checkout', 'wishlist', 'update_profile', 'change_password', 'other'],
    default: 'other'
  },
  activityDescription: {
    type: String,
    required: true
  },
  activityDate: {
    type: Date,
    default: Date.now
  }
});

// Index for faster querying by user and date
ActivityLogSchema.index({ user: 1, activityDate: -1 });

// Export the model
module.exports = mongoose.model('ActivityLog', ActivityLogSchema);
