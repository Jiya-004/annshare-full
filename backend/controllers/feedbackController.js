const Feedback = require('../models/Feedback');

// GET all feedback / complaints
const getFeedback = async (req, res) => {
  try {
    const feedbackList = await Feedback.find().sort({ createdAt: -1 });
    const formatted = feedbackList.map((f) => ({
      _id: f._id,
      id: f._id.toString(),
      fullName: f.fullName,
      userName: f.userName || f.fullName,
      userRole: f.userRole,
      email: f.email,
      phone: f.phone,
      organization: f.organization,
      topic: f.topic,
      type: f.type,
      subject: f.subject || f.topic,
      description: f.description || f.message,
      message: f.message || f.description,
      date: f.date,
      priority: f.priority,
      status: f.status,
      response: f.response,
    }));
    res.status(200).json(formatted);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST submit new feedback or ticket
const createFeedback = async (req, res) => {
  try {
    const data = { ...req.body };
    if (!data.message && data.description) data.message = data.description;
    if (!data.description && data.message) data.description = data.message;
    if (!data.fullName && data.userName) data.fullName = data.userName;
    if (!data.userName && data.fullName) data.userName = data.fullName;

    const feedback = await Feedback.create(data);
    res.status(201).json({
      _id: feedback._id,
      id: feedback._id.toString(),
      ...feedback.toObject(),
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT respond / update complaint status
const respondFeedback = async (req, res) => {
  try {
    const { response, status, priority } = req.body;
    const updateData = {};
    if (response !== undefined) updateData.response = response;
    if (status) updateData.status = status;
    if (priority) updateData.priority = priority;

    const feedback = await Feedback.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!feedback) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.status(200).json(feedback);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE feedback
const deleteFeedback = async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Ticket deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getFeedback,
  createFeedback,
  respondFeedback,
  deleteFeedback,
};
