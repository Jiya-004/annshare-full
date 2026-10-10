const Notification = require('../models/Notification');

// Helper function to create notification internally from any controller
const sendNotification = async ({ title, desc, linkTab = 'Dashboard', userId = '', role = 'all', category = 'general', relatedId = '' }) => {
  try {
    const notif = await Notification.create({
      title,
      desc,
      linkTab,
      userId,
      role,
      category,
      relatedId,
      time: 'Just now',
    });
    return notif;
  } catch (err) {
    console.warn('Failed to dispatch notification:', err.message);
    return null;
  }
};

// GET notifications with optional filtering by role or userId
const getNotifications = async (req, res) => {
  try {
    const { role, userId } = req.query;
    let filter = {};

    if (userId && role && role !== 'all') {
      filter.$or = [
        { userId: userId },
        { role: role, $or: [{ userId: '' }, { userId: { $exists: false } }, { userId: null }] },
        { role: 'all', $or: [{ userId: '' }, { userId: { $exists: false } }, { userId: null }] },
      ];
    } else if (userId) {
      filter.$or = [
        { userId: userId },
        { role: 'all', $or: [{ userId: '' }, { userId: { $exists: false } }, { userId: null }] },
      ];
    } else if (role && role !== 'all') {
      filter.$or = [
        { role: role },
        { role: 'all' },
      ];
    }

    const notifs = await Notification.find(filter).sort({ createdAt: -1 }).limit(50);
    res.status(200).json(notifs.map((n) => ({ id: n._id.toString(), _id: n._id, ...n.toObject() })));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST create custom notification
const createNotification = async (req, res) => {
  try {
    const { title, desc, linkTab, userId, role, category, relatedId } = req.body;
    if (!title || !desc) {
      return res.status(400).json({ message: 'Title and description are required' });
    }
    const notif = await sendNotification({ title, desc, linkTab, userId, role, category, relatedId });
    res.status(201).json(notif);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const markNotificationRead = async (req, res) => {
  try {
    const notif = await Notification.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    res.status(200).json(notif);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const markAllNotificationsRead = async (req, res) => {
  try {
    const { userId, role } = req.body;
    let filter = {};
    if (userId) filter.userId = userId;
    else if (role) filter.role = role;

    await Notification.updateMany(filter, { read: true });
    res.status(200).json({ message: 'All notifications marked as read' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getNotifications,
  createNotification,
  markNotificationRead,
  markAllNotificationsRead,
  sendNotification,
};
