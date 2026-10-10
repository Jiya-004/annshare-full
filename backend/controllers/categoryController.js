const Category = require('../models/Category');

// GET all categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: 1 });
    const formatted = categories.map((c) => ({
      _id: c._id,
      id: c._id.toString(),
      name: c.name,
      slug: c.slug,
      icon: c.icon,
      description: c.description,
      color: c.color,
      itemCount: c.itemCount,
      status: c.status,
    }));
    res.status(200).json(formatted);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST create category
const createCategory = async (req, res) => {
  try {
    const { name, icon, description, color, status } = req.body;
    const category = await Category.create({
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      icon: icon || 'utensils',
      description: description || '',
      color: color || '#173F35',
      status: status || 'Active',
      itemCount: 0,
    });
    res.status(201).json({
      _id: category._id,
      id: category._id.toString(),
      ...category.toObject(),
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT update category
const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PATCH toggle category status
const toggleCategoryStatus = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    category.status = category.status === 'Active' ? 'Inactive' : 'Active';
    await category.save();
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE category
const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  toggleCategoryStatus,
  deleteCategory,
};
