const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getRequests,
  getRequestById,
  createRequest,
  updateRequestStatus,
  deleteRequest,
} = require('../controllers/requestController');

router.get('/', getRequests);
router.get('/:id', getRequestById);
router.post('/', protect, createRequest);
router.patch('/:id/status', protect, updateRequestStatus);
router.delete('/:id', protect, deleteRequest);

module.exports = router;
