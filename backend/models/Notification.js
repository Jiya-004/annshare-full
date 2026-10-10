const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    time: { type: String, default: 'Just now' },
    read: { type: Boolean, default: false },
    linkTab: { type: String, default: 'Dashboard' },
    userId: { type: String },
    role: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Notification', notificationSchema);
