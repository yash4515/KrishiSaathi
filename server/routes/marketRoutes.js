const router = require('express').Router();
const { getMarketplace, placeBid, getBids, getMyBids, acceptBid, rejectBid, withdrawBid } = require('../controllers/marketController');
const { auth, authorize } = require('../middlewares/auth');
const { validateBid, validateId } = require('../middlewares/validate');

router.get('/', getMarketplace);
router.post('/bid', auth, authorize('buyer'), validateBid, placeBid);
router.get('/my-bids', auth, authorize('buyer'), getMyBids);
router.get('/bids/:listingId', getBids);
router.put('/bid/:id/accept', auth, authorize('farmer'), validateId, acceptBid);
router.put('/bid/:id/reject', auth, authorize('farmer'), validateId, rejectBid);
router.delete('/bid/:id', auth, authorize('buyer'), validateId, withdrawBid);

module.exports = router;
