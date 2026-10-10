const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    userName: { type: String },
    userRole: { type: String, default: 'General User' },
    email: { type: String, required: true },
    phone: { type: String, default: '' },
    organization: { type: String, default: '' },
    topic: { type: String, default: 'General Inquiry' },
    type: { type: String, default: 'Inquiry' },
    subject: { type: String, default: '' },
    message: { type: String, required: true },
    description: { type: String },
    date: {
      type: String,
      default: () =>
        new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Urgent'],
      default: 'Medium',
    },
    status: {
      type: String,
      enum: ['Open', 'In Review', 'Resolved', 'Closed'],
      default: 'Open',
    },
    response: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Feedback', feedbackSchema);
