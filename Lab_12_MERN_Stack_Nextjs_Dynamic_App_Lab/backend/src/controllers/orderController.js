const Order = require('../models/Order');
const Product = require('../models/Product');

exports.createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;
    if (!items || items.length === 0)
      return res.status(400).json({ success: false, message: 'No items' });

    // Verify prices from DB
    const dbItems = await Promise.all(items.map(async item => {
      const product = await Product.findById(item.product);
      if (!product) throw new Error(`Product ${item.product} not found`);
      if (product.stock < item.qty) throw new Error(`Insufficient stock for ${product.name}`);
      return { product: product._id, name: product.name, image: product.mainImage, price: product.price, qty: item.qty };
    }));

    const itemsPrice = dbItems.reduce((sum, i) => sum + i.price * i.qty, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 9.99;
    const taxPrice = Math.round(itemsPrice * 0.2 * 100) / 100;
    const totalPrice = Math.round((itemsPrice + shippingPrice + taxPrice) * 100) / 100;

    const order = await Order.create({
      user: req.user._id, items: dbItems, shippingAddress,
      paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice
    });

    // Update stock
    await Promise.all(dbItems.map(item =>
      Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.qty, soldCount: item.qty } })
    ));

    res.status(201).json({ success: true, order });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 }).populate('items.product', 'name mainImage');
    res.json({ success: true, orders });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email').populate('items.product', 'name mainImage');
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin')
      return res.status(403).json({ success: false, message: 'Not authorized' });
    res.json({ success: true, order });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.payOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    order.isPaid = true;
    order.paidAt = Date.now();
    order.status = 'processing';
    order.paymentResult = req.body;
    await order.save();
    res.json({ success: true, order });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Admin
exports.getAllOrders = async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const filter = status ? { status } : {};
    const [orders, total] = await Promise.all([
      Order.find(filter).sort({ createdAt: -1 })
        .skip((page - 1) * limit).limit(Number(limit))
        .populate('user', 'name email'),
      Order.countDocuments(filter)
    ]);
    res.json({ success: true, orders, total });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status,
      ...(status === 'delivered' ? { deliveredAt: Date.now() } : {})
    }, { new: true });
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, order });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
