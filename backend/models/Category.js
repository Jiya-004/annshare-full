const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String },
    icon: { type: String, default: 'utensils' },
    description: { type: String, default: '' },
    color: { type: String, default: '#173F35' },
    itemCount: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);
