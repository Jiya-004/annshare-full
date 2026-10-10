const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema(
  {
    listingId: { type: String },
    donationId: { type: String },
    foodTitle: { type: String, required: true },
    foodName: { type: String },
    receiverName: { type: String, default: 'Community NGO' },
    receiverId: { type: String },
    donorName: { type: String, default: 'Food Partner' },
    donorId: { type: String },
    requestedQuantity: { type: String, default: '1 batch' },
    portions: { type: String, default: '' },
    location: { type: String, default: 'Kathmandu' },
    pickupWindow: { type: String, default: 'Today · 5:00 PM - 7:30 PM' },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'rejected', 'completed', 'cancelled', 'Pending', 'Confirmed', 'Rejected', 'Completed', 'Cancelled'],
      default: 'confirmed',
    },
    requestedAt: { type: String, default: 'Just now' },
    requestDate: {
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
    reason: { type: String, default: 'Community distribution' },
    image: { type: String, default: '/food.png' },
    contact: { type: String, default: '+977 9841234567' },
    ngoId: { type: String },
    ngoName: { type: String, default: 'Hope Foundation Nepal' },
    ngoOrg: { type: String, default: 'Hope Foundation' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Request', requestSchema);
