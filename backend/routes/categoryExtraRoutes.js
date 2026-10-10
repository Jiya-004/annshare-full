const express = require('express');
const router = express.Router();
const {
  getBlogCategories,
  saveBlogCategory,
  toggleBlogCategory,
  deleteBlogCategory,
  getFaqCategories,
  saveFaqCategory,
  toggleFaqCategory,
  deleteFaqCategory,
} = require('../controllers/categoryExtraController');

// Blog categories
router.get('/blogs', getBlogCategories);
router.post('/blogs', saveBlogCategory);
router.patch('/blogs/:id/toggle', toggleBlogCategory);
router.delete('/blogs/:id', deleteBlogCategory);

// FAQ categories
router.get('/faqs', getFaqCategories);
router.post('/faqs', saveFaqCategory);
router.patch('/faqs/:id/toggle', toggleFaqCategory);
router.delete('/faqs/:id', deleteFaqCategory);

module.exports = router;
