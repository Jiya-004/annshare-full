const Notification = require('../models/Notification');

const getNotifications = async (req, res) => {
  try {
    const notifs = await Notification.find().sort({ createdAt: -1 });
    if (notifs.length === 0) {
      // Seed default initial notifications if empty
      const initial = [
        { title: 'NGO Verification Request', desc: 'Mercy Community Food Pantry submitted verification audit.', time: '10m ago', read: false, linkTab: 'Users' },
        { title: 'New Food Request', desc: 'St. Jude Shelter requested Bakery Surplus.', time: '45m ago', read: false, linkTab: 'Requests' },
        { title: 'Donation Expiring Soon', desc: 'Green Kitchen 50 Warm Meal Boxes expires in 2 hours.', time: '1h ago', read: false, linkTab: 'Donations' },
        { title: 'New Complaint Logged', desc: 'High priority ticket logged for Pickup #DON-505.', time: '2h ago', read: true, linkTab: 'Feedback' },
      ];
      await Notification.insertMany(initial);
      const seeded = await Notification.find().sort({ createdAt: -1 });
      return res.status(200).json(seeded.map((n) => ({ id: n._id.toString(), _id: n._id, ...n.toObject() })));
    }
    res.status(200).json(notifs.map((n) => ({ id: n._id.toString(), _id: n._id, ...n.toObject() })));
  } catch (err) {
    res.status(500).json({ message: err.message });
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
    await Notification.updateMany({}, { read: true });
    res.status(200).json({ message: 'All notifications marked as read' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
};
