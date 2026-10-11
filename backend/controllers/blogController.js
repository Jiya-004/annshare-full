const mongoose = require('mongoose');
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
    let blog = null;
    if (mongoose.Types.ObjectId.isValid(slug)) {
      blog = await Blog.findById(slug);
    }
    if (!blog) {
      blog = await Blog.findOne({ slug });
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
    // Remove custom non-ObjectId string if passed in id/_id
    if (data.id && !mongoose.Types.ObjectId.isValid(data.id)) {
      delete data.id;
    }
    if (data._id && !mongoose.Types.ObjectId.isValid(data._id)) {
      delete data._id;
    }
    if (!data.slug) {
      data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    // Check if slug already exists; append timestamp if duplicate
    const existing = await Blog.findOne({ slug: data.slug });
    if (existing) {
      data.slug = `${data.slug}-${Date.now()}`;
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
    const { id } = req.params;
    let blog = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      blog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
    }
    if (!blog) {
      blog = await Blog.findOneAndUpdate(
        { $or: [{ slug: id }, { slug: req.body?.slug }, { title: req.body?.title }] },
        req.body,
        { new: true }
      );
    }
    if (!blog) {
      // If not in DB yet (e.g. mock seeded item being saved), create it
      const createData = { ...req.body };
      if (createData.id && !mongoose.Types.ObjectId.isValid(createData.id)) {
        delete createData.id;
      }
      if (createData._id && !mongoose.Types.ObjectId.isValid(createData._id)) {
        delete createData._id;
      }
      blog = await Blog.create(createData);
    }
    res.status(200).json({
      _id: blog._id,
      id: blog._id.toString(),
      ...blog.toObject(),
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PATCH toggle blog status
const toggleBlogStatus = async (req, res) => {
  try {
    const { id } = req.params;
    let blog = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      blog = await Blog.findById(id);
    }
    if (!blog) {
      blog = await Blog.findOne({ slug: id });
    }
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    blog.status = blog.status === 'Published' ? 'Draft' : 'Published';
    await blog.save();
    res.status(200).json({
      _id: blog._id,
      id: blog._id.toString(),
      ...blog.toObject(),
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE blog
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    let blog = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      blog = await Blog.findByIdAndDelete(id);
    }
    if (!blog) {
      blog = await Blog.findOneAndDelete({ $or: [{ slug: id }] });
    }
    res.status(200).json({ message: 'Blog post deleted successfully', blog });
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
