const Blog = require('../models/Blog');

// GET all blogs
const getBlogs = async (req, res) => {
  try {
    const { status, category } = req.query;
    let filter = {};
    if (status) filter.status = status;
    if (category && category !== 'All') filter.category = category;

    const blogs = await Blog.find(filter).sort({ createdAt: -1 });
    const formatted = blogs.map((b) => ({
      _id: b._id,
      id: b._id.toString(),
      title: b.title,
      slug: b.slug,
      authorName: b.authorName,
      authorRole: b.authorRole,
      authorAvatar: b.authorAvatar,
      category: b.category,
      readTime: b.readTime,
      publishedDate: b.publishedDate,
      image: b.image,
      excerpt: b.excerpt,
      content: b.content,
      isFeatured: b.isFeatured,
      status: b.status,
    }));
    res.status(200).json(formatted);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET blog by slug or ID
const getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    let blog = await Blog.findOne({ slug });
    if (!blog && slug.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await Blog.findById(slug);
    }
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.status(200).json({
      _id: blog._id,
      id: blog._id.toString(),
      ...blog.toObject(),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST create blog
const createBlog = async (req, res) => {
  try {
    const data = { ...req.body };
    if (!data.slug) {
      data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    const blog = await Blog.create(data);
    res.status(201).json({
      _id: blog._id,
      id: blog._id.toString(),
      ...blog.toObject(),
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT update blog
const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.status(200).json(blog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PATCH toggle blog status
const toggleBlogStatus = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    blog.status = blog.status === 'Published' ? 'Draft' : 'Published';
    await blog.save();
    res.status(200).json(blog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE blog
const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Blog post deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  toggleBlogStatus,
  deleteBlog,
};
