const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, unique: true },
  excerpt: { type: String },
  content: { type: String, required: true },
  image: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  authorName: { type: String, default: 'Rustik Plank' },
  tags: [String],
  category: { type: String, default: 'General' },
  published: { type: Boolean, default: true },
  views: { type: Number, default: 0 }
}, { timestamps: true });

blogSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }
  next();
});

module.exports = mongoose.model('Blog', blogSchema);
