const express = require('express');
const router = express.Router();
const {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  toggleBlogStatus,
  deleteBlog,
} = require('../controllers/blogController');

router.get('/', getBlogs);
router.get('/:slug', getBlogBySlug);
router.post('/', createBlog);
router.put('/:id', updateBlog);
router.patch('/:id/toggle', toggleBlogStatus);
router.delete('/:id', deleteBlog);

module.exports = router;
