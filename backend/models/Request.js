const mongoose = require('mongoose');

const formatNepaliDate = (date = new Date()) => {
  return new Date(date).toLocaleString('en-US', {
    timeZone: 'Asia/Kathmandu',
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

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
      default: 'Pending Admin Approval',
    },
    requestedAt: { type: String, default: 'Just now' },
    requestDate: {
      type: String,
      default: () => formatNepaliDate(),
    },
    reason: { type: String, default: 'Community distribution' },
    image: { type: String, default: '/food.png' },
    contact: { type: String, default: '+977 9841234567' },
    donorPhone: { type: String, default: '+977 980-1234567' },
    donorEmail: { type: String, default: '' },
    donorLocation: { type: String, default: '' },
    ngoPhone: { type: String, default: '+977 984-1234567' },
    ngoEmail: { type: String, default: '' },
    ngoLocation: { type: String, default: '' },
    ngoId: { type: String },
    ngoName: { type: String, default: 'Hope Foundation Nepal' },
    ngoOrg: { type: String, default: 'Hope Foundation' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Request', requestSchema);
