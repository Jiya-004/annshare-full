const Notification = require('../models/Notification');

// Helper function to create notification internally from any controller
const sendNotification = async ({ title, desc, linkTab = 'Dashboard', userId = '', role = 'all', category = 'general', relatedId = '' }) => {
  try {
    const notif = await Notification.create({
      title,
      desc,
      linkTab,
      userId: userId ? String(userId) : '',
      role,
      category,
      relatedId: relatedId ? String(relatedId) : '',
      time: 'Just now',
    });
    return notif;
  } catch (err) {
    console.warn('Failed to dispatch notification:', err.message);
    return null;
  }
};

// GET notifications with strict filtering by role or userId
const getNotifications = async (req, res) => {
  try {
    const { role, userId } = req.query;

    let filter = null;

    if (role === 'admin') {
      filter = { role: 'admin' };
    } else if (userId) {
      // User must strictly only receive notifications addressed directly to their userId
      filter = {
        userId: String(userId),
        role: { $ne: 'admin' },
      };
    } else {
      // If no userId is provided and not admin, visitors should not see any notifications
      return res.status(200).json([]);
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
