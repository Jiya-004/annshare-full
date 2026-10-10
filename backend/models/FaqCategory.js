const mongoose = require('mongoose');

const faqCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    faqCount: { type: Number, default: 0 },
    createdDate: {
      type: String,
      default: () => new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('FaqCategory', faqCategorySchema);
