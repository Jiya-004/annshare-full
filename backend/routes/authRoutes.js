const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  updateProfile,
  changePassword,
  forgotPassword,
  getWishlist,
  toggleWishlist,
  syncWishlist,
  getAllUsers,
  updateUserStatus,
  verifyNGO,
  deleteUser,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/roleMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.put('/change-password', protect, changePassword);

// Wishlist endpoints for logged-in user
router.get('/wishlist', protect, getWishlist);
router.post('/wishlist/toggle', protect, toggleWishlist);
router.put('/wishlist/sync', protect, syncWishlist);

// Admin user management routes
router.get('/users', getAllUsers); // Open or with protect, allows admin dashboard to retrieve user roster
router.put('/users/:id/status', updateUserStatus);
router.put('/users/:id/verify', verifyNGO);
router.delete('/users/:id', deleteUser);

module.exports = router;