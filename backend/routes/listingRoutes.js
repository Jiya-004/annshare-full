const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getListings,
  getListingById,
  createListing,
  updateListing,
  updateListingStatus,
  deleteListing,
} = require('../controllers/listingController');

router.get('/', getListings);
router.get('/:id', getListingById);
router.post('/', protect, createListing);
router.put('/:id', protect, updateListing);
router.patch('/:id/status', protect, updateListingStatus);
router.delete('/:id', protect, deleteListing);

module.exports = router;