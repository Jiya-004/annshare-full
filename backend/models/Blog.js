const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    authorName: { type: String, default: 'ANNShare Team' },
    authorRole: { type: String, default: 'Community Lead' },
    authorAvatar: { type: String, default: 'AS' },
    category: { type: String, default: 'Community Impact' },
    readTime: { type: String, default: '5 min read' },
    publishedDate: {
      type: String,
      default: () => new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    },
    image: { type: String, default: '/food.png' },
    excerpt: { type: String, default: '' },
    content: { type: String, required: true },
    isFeatured: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ['Published', 'Draft'],
      default: 'Published',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Blog', blogSchema);
