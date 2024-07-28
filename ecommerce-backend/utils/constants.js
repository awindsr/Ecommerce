// utils/constant.js

module.exports = {
    // User roles
    ROLES: {
      USER: 'user',
      ADMIN: 'admin',
    },
  
    // Order status
    ORDER_STATUS: {
      PENDING: 'pending',
      SHIPPED: 'shipped',
      DELIVERED: 'delivered',
      CANCELLED: 'cancelled',
    },
  
    // Promotion types
    PROMOTION_TYPES: {
      PERCENTAGE: 'percentage',
      FIXED: 'fixed',
    },
  
    // Error messages
    ERROR_MESSAGES: {
      AUTH_REQUIRED: 'Authentication required.',
      ACCESS_DENIED: 'Access denied.',
      INVALID_CREDENTIALS: 'Invalid credentials.',
      INVALID_INPUT: 'Invalid input data.',
      USER_NOT_FOUND: 'User not found.',
      PRODUCT_NOT_FOUND: 'Product not found.',
      ORDER_NOT_FOUND: 'Order not found.',
      PROMOTION_NOT_FOUND: 'Promotion not found.',
    },
  
    // Success messages
    SUCCESS_MESSAGES: {
      SIGNUP_SUCCESS: 'User signed up successfully.',
      LOGIN_SUCCESS: 'Login successful.',
      LOGOUT_SUCCESS: 'Logout successful.',
      PROFILE_UPDATED: 'Profile updated successfully.',
      PRODUCT_CREATED: 'Product created successfully.',
      PRODUCT_UPDATED: 'Product updated successfully.',
      PRODUCT_DELETED: 'Product deleted successfully.',
      ORDER_CREATED: 'Order created successfully.',
      ORDER_UPDATED: 'Order updated successfully.',
      ORDER_CANCELLED: 'Order cancelled successfully.',
      PROMOTION_CREATED: 'Promotion created successfully.',
      PROMOTION_UPDATED: 'Promotion updated successfully.',
      PROMOTION_DELETED: 'Promotion deleted successfully.',
    },
  
    // Miscellaneous
    MISC: {
      JWT_SECRET: process.env.JWT_SECRET || 'supersecretkey',
      JWT_EXPIRATION: '1h',
      PASSWORD_MIN_LENGTH: 8,
      SUPPORT_EMAIL: '',
      CONTACT_PHONE: '',
    },
  };
  