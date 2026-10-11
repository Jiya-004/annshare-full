const mongoose = require('mongoose');

const workerDonationSchema = new mongoose.Schema(
  {
    donorName: {
      type: String,
      default: 'Anonymous Donor',
      trim: true,
    },
    donorPhone: {
      type: String,
      default: '',
      trim: true,
    },
    donorEmail: {
      type: String,
      default: '',
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, 'Donation amount is required'],
      min: [1, 'Amount must be greater than 0'],
    },
    currency: {
      type: String,
      default: 'NPR',
    },
    paymentMethod: {
      type: String,
      enum: ['esewa', 'khalti', 'fonepay', 'bank', 'cash', 'other'],
      default: 'esewa',
    },
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ['Completed', 'Verified', 'Pending', 'Failed'],
      default: 'Completed',
    },
    fundType: {
      type: String,
      default: 'Worker Welfare Fund',
    },
    note: {
      type: String,
      default: '',
    },
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
  },
  { timestamps: true }
);

module.exports = mongoose.model('WorkerDonation', workerDonationSchema);
