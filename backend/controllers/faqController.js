const mongoose = require('mongoose');
const Faq = require('../models/Faq');

// GET all faqs
const getFaqs = async (req, res) => {
  try {
    const { status, category } = req.query;
    let filter = {};
    if (status) filter.status = status;
    if (category && category !== 'All') filter.category = category;

    const faqs = await Faq.find(filter).sort({ displayOrder: 1, createdAt: 1 });
    const formatted = faqs.map((f) => ({
      _id: f._id,
      id: f._id.toString(),
      question: f.question,
      answer: f.answer,
      category: f.category,
      displayOrder: f.displayOrder,
      status: f.status,
    }));
    res.status(200).json(formatted);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST create FAQ
const createFaq = async (req, res) => {
  try {
    const data = { ...req.body };
    if (data.id && !mongoose.Types.ObjectId.isValid(data.id)) {
      delete data.id;
    }
    if (data._id && !mongoose.Types.ObjectId.isValid(data._id)) {
      delete data._id;
    }
    const count = await Faq.countDocuments();
    const faq = await Faq.create({
      ...data,
      displayOrder: data.displayOrder || count + 1,
    });
    res.status(201).json({
      _id: faq._id,
      id: faq._id.toString(),
      ...faq.toObject(),
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT update FAQ
const updateFaq = async (req, res) => {
  try {
    const { id } = req.params;
    let faq = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      faq = await Faq.findByIdAndUpdate(id, req.body, { new: true });
    }
    if (!faq) {
      faq = await Faq.findOneAndUpdate(
        { $or: [{ question: req.body?.question }, { displayOrder: req.body?.displayOrder }] },
        req.body,
        { new: true }
      );
    }
    if (!faq) {
      // If not in DB yet (e.g. mock seeded item being updated), create it
      const createData = { ...req.body };
      if (createData.id && !mongoose.Types.ObjectId.isValid(createData.id)) {
        delete createData.id;
      }
      if (createData._id && !mongoose.Types.ObjectId.isValid(createData._id)) {
        delete createData._id;
      }
      faq = await Faq.create(createData);
    }
    res.status(200).json({
      _id: faq._id,
      id: faq._id.toString(),
      ...faq.toObject(),
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PATCH toggle FAQ status
const toggleFaqStatus = async (req, res) => {
  try {
    const { id } = req.params;
    let faq = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      faq = await Faq.findById(id);
    }
    if (!faq) {
      faq = await Faq.findOne({ question: id });
    }
    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }
    faq.status = faq.status === 'Active' ? 'Inactive' : 'Active';
    await faq.save();
    res.status(200).json({
      _id: faq._id,
      id: faq._id.toString(),
      ...faq.toObject(),
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE FAQ
const deleteFaq = async (req, res) => {
  try {
    const { id } = req.params;
    let faq = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      faq = await Faq.findByIdAndDelete(id);
    }
    if (!faq) {
      faq = await Faq.findOneAndDelete({ $or: [{ question: id }] });
    }
    res.status(200).json({ message: 'FAQ deleted successfully', faq });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getFaqs,
  createFaq,
  updateFaq,
  toggleFaqStatus,
  deleteFaq,
};
