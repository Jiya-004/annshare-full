const express = require('express');
const router = express.Router();
const {
  getWorkerDonations,
  createWorkerDonation,
  updateWorkerDonationStatus,
  deleteWorkerDonation,
  getWorkerDonationStats,
} = require('../controllers/workerDonationController');

router.get('/', getWorkerDonations);
router.get('/stats', getWorkerDonationStats);
router.post('/', createWorkerDonation);
router.patch('/:id/status', updateWorkerDonationStatus);
router.put('/:id', updateWorkerDonationStatus);
router.delete('/:id', deleteWorkerDonation);

module.exports = router;
