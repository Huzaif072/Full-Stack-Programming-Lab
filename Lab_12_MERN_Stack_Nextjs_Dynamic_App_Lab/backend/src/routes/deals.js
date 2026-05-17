const router = require('express').Router();
const ctrl = require('../controllers/dealController');
const { protect, admin } = require('../middleware/auth');
router.get('/', ctrl.getDeals);
router.post('/', protect, admin, ctrl.createDeal);
router.put('/:id', protect, admin, ctrl.updateDeal);
router.delete('/:id', protect, admin, ctrl.deleteDeal);
module.exports = router;
