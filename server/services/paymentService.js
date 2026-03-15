const razorpay = require('../config/razorpay');
const crypto = require('crypto');

// Create a Razorpay order
exports.createOrder = async (amount, orderId) => {
    const options = {
        amount: Math.round(amount * 100), // Convert to paise
        currency: 'INR',
        receipt: `order_${orderId}`,
        notes: {
            platform: 'KrishiSaathi',
            orderId,
        },
    };

    const order = await razorpay.orders.create(options);
    return order;
};

// Verify Razorpay payment signature
exports.verifyPayment = (razorpayOrderId, razorpayPaymentId, razorpaySignature) => {
    const body = razorpayOrderId + '|' + razorpayPaymentId;
    const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest('hex');

    return expectedSignature === razorpaySignature;
};
