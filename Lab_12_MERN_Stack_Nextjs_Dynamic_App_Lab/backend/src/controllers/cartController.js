const Product = require('../models/Product');

// Cart is managed on the frontend (localStorage) but we validate prices server-side
exports.validateCart = async (req, res) => {
  try {
    const { items } = req.body;
    const validated = await Promise.all(items.map(async item => {
      const product = await Product.findById(item.productId).select('name price mainImage stock isActive');
      if (!product || !product.isActive)
        return { ...item, error: 'Product not available', available: false };
      if (product.stock < item.qty)
        return { ...item, actualPrice: product.price, maxQty: product.stock, available: product.stock > 0, error: `Only ${product.stock} in stock` };
      return { ...item, actualPrice: product.price, name: product.name, image: product.mainImage, available: true };
    }));
    res.json({ success: true, items: validated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getCartSummary = async (req, res) => {
  try {
    const { items } = req.body;
    let subtotal = 0;
    const details = await Promise.all(items.map(async item => {
      const product = await Product.findById(item.productId).select('name price mainImage stock');
      if (!product) return null;
      const lineTotal = product.price * item.qty;
      subtotal += lineTotal;
      return { productId: item.productId, name: product.name, price: product.price, image: product.mainImage, qty: item.qty, lineTotal };
    }));
    const validItems = details.filter(Boolean);
    const shipping = subtotal > 100 ? 0 : 9.99;
    const tax = Math.round(subtotal * 0.2 * 100) / 100;
    const total = Math.round((subtotal + shipping + tax) * 100) / 100;
    res.json({ success: true, items: validItems, subtotal, shipping, tax, total });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
