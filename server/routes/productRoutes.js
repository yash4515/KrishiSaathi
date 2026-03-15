const router = require('express').Router();
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { auth, authorize } = require('../middlewares/auth');
const { validateId, validateProduct } = require('../middlewares/validate');
const upload = require('../middlewares/upload');

router.get('/', getProducts);
router.get('/:id', validateId, getProduct);
router.post('/', auth, authorize('admin'), upload.single('image'), validateProduct, createProduct);
router.put('/:id', auth, authorize('admin'), upload.single('image'), validateId, updateProduct);
router.delete('/:id', auth, authorize('admin'), validateId, deleteProduct);

module.exports = router;
