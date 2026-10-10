const express = require('express');
const router = express.Router();
const {
  getFaqs,
  createFaq,
  updateFaq,
  toggleFaqStatus,
  deleteFaq,
} = require('../controllers/faqController');

router.get('/', getFaqs);
router.post('/', createFaq);
router.put('/:id', updateFaq);
router.patch('/:id/toggle', toggleFaqStatus);
router.delete('/:id', deleteFaq);

module.exports = router;
