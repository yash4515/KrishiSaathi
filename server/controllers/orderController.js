const Order = require('../models/Order');
const CropListing = require('../models/CropListing');
const paymentService = require('../services/paymentService');

// POST /api/order/create
exports.createOrder = async (req, res, next) => {
    try {
        const { listingId, quantity, totalAmount, deliveryAddress } = req.body;

        const listing = await CropListing.findById(listingId);
        if (!listing) {
            return res.status(404).json({ success: false, message: 'Listing not found.' });
        }
        if (listing.status !== 'active') {
            return res.status(400).json({ success: false, message: 'Listing is no longer active.' });
        }

        const order = await Order.create({
            buyerId: req.user._id,
            farmerId: listing.farmerId,
            listingId,
            quantity,
            totalAmount,
            deliveryAddress,
        });

        // Create Razorpay order
        let razorpayOrder = null;
        try {
            razorpayOrder = await paymentService.createOrder(totalAmount, order._id.toString());
        } catch (payErr) {
            console.error('Razorpay order creation failed (non-blocking):', payErr.message);
        }

        res.status(201).json({
            success: true,
            message: 'Order created successfully',
            data: { order, razorpayOrder },
        });
    } catch (error) {
        next(error);
    }
};

// GET /api/order/history
exports.getOrderHistory = async (req, res, next) => {
    try {
        const { page = 1, limit = 20, status } = req.query;
        const query = {};

        if (req.user.role === 'buyer') {
            query.buyerId = req.user._id;
        } else {
            query.farmerId = req.user._id;
        }

        if (status) query.orderStatus = status;

        const orders = await Order.find(query)
            .populate('buyerId', 'name phone')
            .populate('farmerId', 'name phone')
            .populate('listingId', 'cropName images')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await Order.countDocuments(query);

        res.json({
            success: true,
            data: { orders, total, page: parseInt(page), pages: Math.ceil(total / limit) },
        });
    } catch (error) {
        next(error);
    }
};

// GET /api/order/:id
exports.getOrderById = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('buyerId', 'name phone email location')
            .populate('farmerId', 'name phone email location')
            .populate('listingId', 'cropName images priceRange category');

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found.' });
        }

        // Only buyer, farmer, or admin can view
        const userId = req.user._id.toString();
        const isAuthorized =
            order.buyerId._id.toString() === userId ||
            order.farmerId._id.toString() === userId ||
            req.user.role === 'admin';

        if (!isAuthorized) {
            return res.status(403).json({ success: false, message: 'Not authorized to view this order.' });
        }

        res.json({ success: true, data: { order } });
    } catch (error) {
        next(error);
    }
};

// PUT /api/order/:id/status
exports.updateOrderStatus = async (req, res, next) => {
    try {
        const { orderStatus } = req.body;
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found.' });
        }

        // Only farmer (seller) or admin can update status
        if (order.farmerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Not authorized to update this order.' });
        }

        // Validate status transitions
        const validTransitions = {
            placed: ['confirmed', 'cancelled'],
            confirmed: ['shipped', 'cancelled'],
            shipped: ['delivered'],
            delivered: [],
            cancelled: [],
        };

        if (!validTransitions[order.orderStatus] || !validTransitions[order.orderStatus].includes(orderStatus)) {
            return res.status(400).json({
                success: false,
                message: `Cannot transition from '${order.orderStatus}' to '${orderStatus}'.`,
            });
        }

        order.orderStatus = orderStatus;
        await order.save();

        res.json({
            success: true,
            message: 'Order status updated successfully',
            data: { order },
        });
    } catch (error) {
        next(error);
    }
};

// PUT /api/order/:id/cancel
exports.cancelOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found.' });
        }

        // Both buyer and farmer can cancel, but only if order is still 'placed'
        const userId = req.user._id.toString();
        const isAuthorized =
            order.buyerId.toString() === userId ||
            order.farmerId.toString() === userId ||
            req.user.role === 'admin';

        if (!isAuthorized) {
            return res.status(403).json({ success: false, message: 'Not authorized to cancel this order.' });
        }

        if (order.orderStatus !== 'placed') {
            return res.status(400).json({
                success: false,
                message: 'Only orders with status "placed" can be cancelled.',
            });
        }

        order.orderStatus = 'cancelled';
        if (order.paymentStatus === 'completed') {
            order.paymentStatus = 'refunded';
        }
        await order.save();

        // Reactivate the listing
        await CropListing.findByIdAndUpdate(order.listingId, { status: 'active' });

        res.json({
            success: true,
            message: 'Order cancelled successfully',
            data: { order },
        });
    } catch (error) {
        next(error);
    }
};

// POST /api/order/verify-payment
exports.verifyPayment = async (req, res, next) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const isValid = paymentService.verifyPayment(razorpay_order_id, razorpay_payment_id, razorpay_signature);

        if (!isValid) {
            return res.status(400).json({ success: false, message: 'Payment verification failed.' });
        }

        const order = await Order.findOneAndUpdate(
            { paymentId: razorpay_order_id },
            { paymentStatus: 'completed', paymentId: razorpay_payment_id, orderStatus: 'confirmed' },
            { new: true }
        );

        if (order) {
            await CropListing.findByIdAndUpdate(order.listingId, { status: 'sold' });
        }

        res.json({ success: true, message: 'Payment verified successfully', data: { order } });
    } catch (error) {
        next(error);
    }
};
