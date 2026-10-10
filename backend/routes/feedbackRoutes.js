const express = require('express');
const router = express.Router();
const {
  getFeedback,
  createFeedback,
  respondFeedback,
  deleteFeedback,
} = require('../controllers/feedbackController');

router.get('/', getFeedback);
router.post('/', createFeedback);
router.put('/:id/respond', respondFeedback);
router.patch('/:id/status', respondFeedback);
router.put('/:id', respondFeedback);
router.delete('/:id', deleteFeedback);

module.exports = router;
