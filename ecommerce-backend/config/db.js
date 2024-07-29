// config/db.js
const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, { // Use environment variable directly
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true, // Optional, may be deprecated in newer versions
      useFindAndModify: false, // Optional, may be deprecated in newer versions
    });
    logger.info('MongoDB connected successfully');
  } catch (error) {
    logger.error('MongoDB connection error: ', error);
    process.exit(1);
  }
};

module.exports = connectDB;
