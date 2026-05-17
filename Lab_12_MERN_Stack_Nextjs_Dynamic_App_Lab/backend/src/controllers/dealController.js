const Deal = require('../models/Deal');

exports.getDeals = async (req, res) => {
  try {
    const deals = await Deal.find({ isActive: true });
    res.json({ success: true, deals });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.createDeal = async (req, res) => {
  try {
    const deal = await Deal.create(req.body);
    res.status(201).json({ success: true, deal });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.updateDeal = async (req, res) => {
  try {
    const deal = await Deal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, deal });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.deleteDeal = async (req, res) => {
  try {
    await Deal.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deal deleted' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
