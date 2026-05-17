const User = require('../models/User');

exports.getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('wishlist', 'name price mainImage slug rating numReviews');
    res.json({ success: true, wishlist: user.wishlist });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.toggleWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const productId = req.params.productId;
    const idx = user.wishlist.indexOf(productId);
    if (idx > -1) {
      user.wishlist.splice(idx, 1);
    } else {
      user.wishlist.push(productId);
    }
    await user.save({ validateBeforeSave: false });
    res.json({ success: true, inWishlist: idx === -1, wishlist: user.wishlist });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
