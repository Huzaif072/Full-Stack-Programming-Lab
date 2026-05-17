const router = require('express').Router();
const { validateCart, getCartSummary } = require('../controllers/cartController');
router.post('/validate', validateCart);
router.post('/summary', getCartSummary);
module.exports = router;
