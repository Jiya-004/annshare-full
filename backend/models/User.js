const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['admin', 'donor', 'ngo', 'restaurant', 'volunteer'],
      default: 'donor',
    },
    orgName: { type: String, default: '' },
    organization: { type: String, default: '' },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      unique: true,
      sparse: true,
      trim: true,
    },
    location: { type: String, default: 'Kathmandu, Nepal' },
    badge: { type: String, default: '' },
    avatar: { type: String, default: '' },
    avatarText: { type: String, default: 'U' },
    verificationStatus: {
      type: String,
      enum: ['verified', 'pending', 'rejected', 'unverified'],
      default: 'verified',
    },
    status: {
      type: String,
      enum: ['Active', 'Suspended', 'Inactive'],
      default: 'Active',
    },
    joinedDate: { type: String, default: () => new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) },
    totalDonations: { type: Number, default: 0 },
    completedDonations: { type: Number, default: 0 },
    activeDonations: { type: Number, default: 0 },
    totalRequests: { type: Number, default: 0 },
    completedPickups: { type: Number, default: 0 },
    docs: [
      {
        name: { type: String },
        type: { type: String },
        status: { type: String, enum: ['verified', 'pending', 'rejected'], default: 'pending' },
        url: { type: String, default: '' },
      },
    ],
  },
  { timestamps: true }
);

// Hash password before saving if modified
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  if (!enteredPassword || !this.password) return false;
  if (this.password === enteredPassword) return true;
  try {
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (err) {
    return false;
  }
};

module.exports = mongoose.model('User', userSchema);