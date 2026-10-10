const express = require('express');
const router = express.Router();
const {
  getRequests,
  getRequestById,
  createRequest,
  updateRequestStatus,
  deleteRequest,
} = require('../controllers/requestController');

router.get('/', getRequests);
router.get('/:id', getRequestById);
router.post('/', createRequest);
router.patch('/:id/status', updateRequestStatus);
router.delete('/:id', deleteRequest);

module.exports = router;
