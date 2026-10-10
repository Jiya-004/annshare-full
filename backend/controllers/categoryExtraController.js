const BlogCategory = require('../models/BlogCategory');
const FaqCategory = require('../models/FaqCategory');

// Blog Categories
const getBlogCategories = async (req, res) => {
  try {
    const list = await BlogCategory.find().sort({ createdAt: 1 });
    res.status(200).json(list.map((c) => ({ id: c._id.toString(), _id: c._id, name: c.name, postCount: c.postCount, createdDate: c.createdDate, status: c.status })));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const saveBlogCategory = async (req, res) => {
  try {
    if (req.body.id && req.body.id.match(/^[0-9a-fA-F]{24}$/)) {
      const updated = await BlogCategory.findByIdAndUpdate(req.body.id, req.body, { new: true });
      return res.status(200).json(updated);
    }
    const cat = await BlogCategory.create(req.body);
    res.status(201).json({ id: cat._id.toString(), _id: cat._id, ...cat.toObject() });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const toggleBlogCategory = async (req, res) => {
  try {
    const cat = await BlogCategory.findById(req.params.id);
    if (!cat) return res.status(404).json({ message: 'Category not found' });
    cat.status = cat.status === 'Active' ? 'Inactive' : 'Active';
    await cat.save();
    res.status(200).json(cat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteBlogCategory = async (req, res) => {
  try {
    await BlogCategory.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Category deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// FAQ Categories
const getFaqCategories = async (req, res) => {
  try {
    const list = await FaqCategory.find().sort({ createdAt: 1 });
    res.status(200).json(list.map((c) => ({ id: c._id.toString(), _id: c._id, name: c.name, faqCount: c.faqCount, createdDate: c.createdDate, status: c.status })));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const saveFaqCategory = async (req, res) => {
  try {
    if (req.body.id && req.body.id.match(/^[0-9a-fA-F]{24}$/)) {
      const updated = await FaqCategory.findByIdAndUpdate(req.body.id, req.body, { new: true });
      return res.status(200).json(updated);
    }
    const cat = await FaqCategory.create(req.body);
    res.status(201).json({ id: cat._id.toString(), _id: cat._id, ...cat.toObject() });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const toggleFaqCategory = async (req, res) => {
  try {
    const cat = await FaqCategory.findById(req.params.id);
    if (!cat) return res.status(404).json({ message: 'Category not found' });
    cat.status = cat.status === 'Active' ? 'Inactive' : 'Active';
    await cat.save();
    res.status(200).json(cat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteFaqCategory = async (req, res) => {
  try {
    await FaqCategory.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Category deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getBlogCategories,
  saveBlogCategory,
  toggleBlogCategory,
  deleteBlogCategory,
  getFaqCategories,
  saveFaqCategory,
  toggleFaqCategory,
  deleteFaqCategory,
};
