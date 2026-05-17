const router = require('express').Router();
const ctrl = require('../controllers/blogController');
const { protect, admin } = require('../middleware/auth');
router.get('/', ctrl.getBlogs);
router.get('/:slug', ctrl.getBlog);
router.post('/', protect, admin, ctrl.createBlog);
router.put('/:id', protect, admin, ctrl.updateBlog);
router.delete('/:id', protect, admin, ctrl.deleteBlog);
module.exports = router;
