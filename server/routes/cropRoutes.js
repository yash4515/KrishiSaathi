const router = require('express').Router();
const { addCrop, getMyListings, updateCrop, deleteCrop, getCrop } = require('../controllers/cropController');
const { auth, authorize } = require('../middlewares/auth');
const { validateCrop, validateId } = require('../middlewares/validate');
const upload = require('../middlewares/upload');

router.post('/add', auth, authorize('farmer'), upload.array('images', 5), validateCrop, addCrop);
router.get('/my-listings', auth, authorize('farmer'), getMyListings);
router.get('/:id', validateId, getCrop);
router.put('/:id', auth, authorize('farmer'), upload.array('images', 5), validateId, updateCrop);
router.delete('/:id', auth, authorize('farmer'), validateId, deleteCrop);

module.exports = router;
