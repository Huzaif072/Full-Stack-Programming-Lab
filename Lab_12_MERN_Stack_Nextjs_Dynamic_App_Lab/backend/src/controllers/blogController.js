const Blog = require('../models/Blog');

exports.getBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 9 } = req.query;
    const filter = { published: true };
    const [blogs, total] = await Promise.all([
      Blog.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit)).select('-content'),
      Blog.countDocuments(filter)
    ]);
    res.json({ success: true, blogs, total, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getBlog = async (req, res) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      { slug: req.params.slug, published: true },
      { $inc: { views: 1 } },
      { new: true }
    );
    if (!blog) return res.status(404).json({ success: false, message: 'Post not found' });
    res.json({ success: true, blog });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.createBlog = async (req, res) => {
  try {
    req.body.author = req.user._id;
    req.body.authorName = req.user.name;
    const blog = await Blog.create(req.body);
    res.status(201).json({ success: true, blog });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!blog) return res.status(404).json({ success: false, message: 'Post not found' });
    res.json({ success: true, blog });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Post deleted' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
