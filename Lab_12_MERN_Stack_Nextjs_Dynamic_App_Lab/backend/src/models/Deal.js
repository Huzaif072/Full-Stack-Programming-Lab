const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  description: { type: String },
  discountPercent: { type: Number, default: 0 },
  image: { type: String },
  badge: { type: String },
  linkUrl: { type: String, default: '/shop' },
  isActive: { type: Boolean, default: true },
  startDate: { type: Date },
  endDate: { type: Date },
  type: { type: String, enum: ['hot', 'banner', 'promo'], default: 'hot' }
}, { timestamps: true });

module.exports = mongoose.model('Deal', dealSchema);
