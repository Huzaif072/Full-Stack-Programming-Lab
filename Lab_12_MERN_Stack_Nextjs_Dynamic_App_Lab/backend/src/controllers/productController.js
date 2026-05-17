const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  try {
    const { category, featured, special, popular, hotDeal, newArrival,
            search, sort, page = 1, limit = 12, minPrice, maxPrice } = req.query;

    const filter = { isActive: true };
    if (category) filter.category = category;
    if (featured === 'true') filter.featured = true;
    if (special === 'true') filter.special = true;
    if (popular === 'true') filter.popular = true;
    if (hotDeal === 'true') filter.hotDeal = true;
    if (newArrival === 'true') filter.newArrival = true;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (search) filter.$text = { $search: search };

    const sortMap = {
      newest: { createdAt: -1 },
      oldest: { createdAt: 1 },
      'price-asc': { price: 1 },
      'price-desc': { price: -1 },
      rating: { rating: -1 },
      popular: { soldCount: -1 }
    };
    const sortOption = sortMap[sort] || { createdAt: -1 };
    const skip = (Number(page) - 1) * Number(limit);

    const [products, total] = await Promise.all([
      Product.find(filter).sort(sortOption).skip(skip).limit(Number(limit))
        .populate('category', 'name slug'),
      Product.countDocuments(filter)
    ]);

    res.json({
      success: true,
      products,
      pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / limit) }
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      $or: [{ _id: req.params.id.match(/^[0-9a-fA-F]{24}$/) ? req.params.id : null }, { slug: req.params.id }],
      isActive: true
    }).populate('category', 'name slug');
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, product });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, product });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, product });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, message: 'Product deleted' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString());
    if (alreadyReviewed) return res.status(400).json({ success: false, message: 'Already reviewed' });
    product.reviews.push({ user: req.user._id, name: req.user.name, rating: Number(rating), comment });
    await product.save();
    res.status(201).json({ success: true, message: 'Review added' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getFeaturedProducts = async (req, res) => {
  try {
    const [featured, special, popular] = await Promise.all([
      Product.find({ featured: true, isActive: true }).limit(4).populate('category', 'name'),
      Product.find({ special: true, isActive: true }).limit(4).populate('category', 'name'),
      Product.find({ popular: true, isActive: true }).limit(4).populate('category', 'name'),
    ]);
    res.json({ success: true, featured, special, popular });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
