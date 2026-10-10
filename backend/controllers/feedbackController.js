const Feedback = require('../models/Feedback');
const Notification = require('../models/Notification');

// GET all feedback / complaints
const getFeedback = async (req, res) => {
  try {
    const feedbackList = await Feedback.find().sort({ createdAt: -1 });
    const formatted = feedbackList.map((f) => ({
      _id: f._id,
      id: f._id.toString(),
      fullName: f.fullName || f.userName || 'Anonymous',
      userName: f.userName || f.fullName || 'Anonymous',
      userRole: f.userRole || 'General User',
      email: f.email || '',
      phone: f.phone || '',
      organization: f.organization || '',
      topic: f.topic || f.type || 'General Inquiry',
      type: f.type || 'Inquiry',
      subject: f.subject || f.topic || 'Contact Message',
      description: f.description || f.message || '',
      message: f.message || f.description || '',
      date: f.date || (f.createdAt ? new Date(f.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }) : 'Today'),
      priority: f.priority || 'Medium',
      status: f.status || 'Open',
      response: f.response || '',
      createdAt: f.createdAt,
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
    if (!data.fullName && data.name) data.fullName = data.name;
    if (!data.fullName && data.userName) data.fullName = data.userName;
    if (!data.userName && data.fullName) data.userName = data.fullName;
    if (!data.topic && data.subject) data.topic = data.subject;
    if (!data.subject && data.topic) data.subject = data.topic;

    if (!data.fullName || !data.email || !data.message) {
      return res.status(400).json({ message: 'Full name, email, and message are required.' });
    }

    if (!data.date) {
      data.date = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    }

    const feedback = await Feedback.create(data);

    // Trigger admin dashboard notification
    try {
      await Notification.create({
        title: 'New Contact Inquiry',
        desc: `${feedback.fullName} (${feedback.organization || feedback.email}) sent: "${feedback.topic || 'Inquiry'}"`,
        time: 'Just now',
        read: false,
        linkTab: 'Feedback',
      });
    } catch (notifErr) {
      console.warn('Notification insert error:', notifErr.message);
    }

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
