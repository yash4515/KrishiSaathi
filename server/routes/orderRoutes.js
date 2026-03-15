const router = require('express').Router();
const { createOrder, getOrderHistory, getOrderById, updateOrderStatus, cancelOrder, verifyPayment } = require('../controllers/orderController');
const { auth, authorize } = require('../middlewares/auth');
const { validateOrder, validateId, validateOrderStatus } = require('../middlewares/validate');

router.post('/create', auth, validateOrder, createOrder);
router.get('/history', auth, getOrderHistory);
router.post('/verify-payment', auth, verifyPayment);
router.get('/:id', auth, validateId, getOrderById);
router.put('/:id/status', auth, authorize('farmer', 'admin'), validateId, validateOrderStatus, updateOrderStatus);
router.put('/:id/cancel', auth, validateId, cancelOrder);

module.exports = router;
