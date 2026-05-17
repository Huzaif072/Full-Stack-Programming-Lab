const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true }
}, { timestamps: true });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, unique: true, sparse: true, lowercase: true },
  description: { type: String, required: true },
  shortDescription: { type: String },
  price: { type: Number, required: true, min: 0 },
  comparePrice: { type: Number, default: 0 },
  discountPercent: { type: Number, default: 0 },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  images: [{ url: String, alt: String }],
  mainImage: { type: String, default: '' },
  stock: { type: Number, default: 0, min: 0 },
  sku: { type: String, unique: true, sparse: true },
  tags: [String],
  featured: { type: Boolean, default: false },
  special: { type: Boolean, default: false },
  popular: { type: Boolean, default: false },
  hotDeal: { type: Boolean, default: false },
  newArrival: { type: Boolean, default: false },
  material: { type: String },
  dimensions: {
    width: Number,
    height: Number,
    depth: Number,
    unit: { type: String, default: 'cm' }
  },
  weight: { type: Number },
  colors: [String],
  reviews: [reviewSchema],
  numReviews: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  soldCount: { type: Number, default: 0 }
}, { timestamps: true });

// Auto-generate slug
productSchema.pre('save', function(next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }
  // Calculate discount
  if (this.comparePrice > this.price) {
    this.discountPercent = Math.round(((this.comparePrice - this.price) / this.comparePrice) * 100);
  }
  // Update review stats
  if (this.reviews.length > 0) {
    this.numReviews = this.reviews.length;
    this.rating = this.reviews.reduce((sum, r) => sum + r.rating, 0) / this.reviews.length;
  }
  next();
});

productSchema.index({ name: 'text', description: 'text', tags: 'text' });
productSchema.index({ category: 1, isActive: 1 });
productSchema.index({ featured: 1, isActive: 1 });

module.exports = mongoose.model('Product', productSchema);
