// db.js
const mongoose = require('mongoose');
const logger = require('../utils/logger');
const { DB_URI } = require('./keys');

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    logger.info('MongoDB connected successfully');
  } catch (error) {
    logger.error('MongoDB connection error: ', error);
    process.exit(1);
  }
};

module.exports = connectDB;
