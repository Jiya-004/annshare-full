const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  updateProfile,
  getAllUsers,
  updateUserStatus,
  verifyNGO,
  deleteUser,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/roleMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);

// Admin user management routes
router.get('/users', getAllUsers); // Open or with protect, allows admin dashboard to retrieve user roster
router.put('/users/:id/status', updateUserStatus);
router.put('/users/:id/verify', verifyNGO);
router.delete('/users/:id', deleteUser);

module.exports = router;