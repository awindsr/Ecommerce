// routes/userroutes.js

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const WishlistController = require('../controllers/wishlistController');
const CartController = require('../controllers/cartController');
const ReviewController = require('../controllers/reviewController');
const auth = require('../middleware/auth');

// User profile routes
router.get('/profile', auth, UserController.getProfile);
router.put('/profile', auth, UserController.updateProfile);

// Wishlist routes
router.get('/wishlist', auth, WishlistController.getWishlist);
router.post('/wishlist', auth, WishlistController.addToWishlist);
router.delete('/wishlist/:productId', auth, WishlistController.removeFromWishlist);

// Cart routes
router.get('/cart', auth, CartController.getCart);
router.post('/cart', auth, CartController.addToCart);
router.put('/cart/:productId', auth, CartController.updateCartItem);
router.delete('/cart/:productId', auth, CartController.removeFromCart);

// Purchase history
router.get('/purchase-history', auth, UserController.getPurchaseHistory);

// Reviews
router.post('/reviews/:productId', auth, ReviewController.addReview);
router.get('/reviews/:productId', ReviewController.getProductReviews);
router.put('/reviews/:reviewId', auth, ReviewController.updateReview);
router.delete('/reviews/:reviewId', auth, ReviewController.deleteReview);

// User activities
router.get('/activities', auth, UserController.getUserActivities);

module.exports = router;
