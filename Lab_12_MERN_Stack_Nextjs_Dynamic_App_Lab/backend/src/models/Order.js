const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true },
  image: { type: String },
  price: { type: Number, required: true },
  qty: { type: Number, required: true, min: 1 }
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderNumber: { type: String, unique: true },
  items: [orderItemSchema],
  shippingAddress: {
    name: String,
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: { type: String, default: 'UK' },
    phone: String
  },
  paymentMethod: { type: String, default: 'card' },
  paymentResult: {
    id: String, status: String, updateTime: String, email: String
  },
  itemsPrice: { type: Number, required: true },
  shippingPrice: { type: Number, default: 0 },
  taxPrice: { type: Number, default: 0 },
  totalPrice: { type: Number, required: true },
  isPaid: { type: Boolean, default: false },
  paidAt: { type: Date },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  deliveredAt: { type: Date },
  notes: { type: String }
}, { timestamps: true });

orderSchema.pre('save', function(next) {
  if (!this.orderNumber) {
    this.orderNumber = 'RP-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
