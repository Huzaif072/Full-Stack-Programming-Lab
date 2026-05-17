const router = require('express').Router();
const User = require('../models/User');
const { protect, admin } = require('../middleware/auth');
router.get('/', protect, admin, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
});
module.exports = router;
