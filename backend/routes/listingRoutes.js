const express = require('express');
const router = express.Router();
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
router.post('/', createListing);
router.put('/:id', updateListing);
router.patch('/:id/status', updateListingStatus);
router.delete('/:id', deleteListing);

module.exports = router;