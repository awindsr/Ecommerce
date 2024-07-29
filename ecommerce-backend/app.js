// app.js
require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
const path = require('path');
const connectDB = require('./config/db'); // Ensure path is correct
const { notFound, errorHandler } = require('./middleware/errorHandlers');

// Initialize the app
const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

// CORS Configuration
const corsOptions = {
  origin: process.env.CLIENT_URL || '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Initialize Passport for authentication
app.use(passport.initialize());

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import Routes
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const productRoutes = require('./routes/productRoutes');
const promotionRoutes = require('./routes/promotionRoutes');
const userRoutes = require('./routes/userRoutes');

// Use Routes
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/promotions', promotionRoutes);
app.use('/api/users', userRoutes);

// Home Route
app.get('/', (req, res) => {
  res.send('Welcome to the E-commerce API');
});

// Error Handling
app.use(notFound);
app.use(errorHandler);

// Define Port and Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
