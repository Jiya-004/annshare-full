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
    const count = await Faq.countDocuments();
    const faq = await Faq.create({
      ...req.body,
      displayOrder: req.body.displayOrder || count + 1,
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
    const faq = await Faq.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }
    res.status(200).json(faq);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PATCH toggle FAQ status
const toggleFaqStatus = async (req, res) => {
  try {
    const faq = await Faq.findById(req.params.id);
    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }
    faq.status = faq.status === 'Active' ? 'Inactive' : 'Active';
    await faq.save();
    res.status(200).json(faq);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE FAQ
const deleteFaq = async (req, res) => {
  try {
    await Faq.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'FAQ deleted successfully' });
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
