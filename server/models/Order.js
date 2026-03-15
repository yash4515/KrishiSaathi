const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        buyerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Buyer ID is required'],
        },
        farmerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Farmer ID is required'],
        },
        listingId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CropListing',
            required: [true, 'Listing ID is required'],
        },
        bidId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Bid',
        },
        quantity: {
            type: Number,
            required: [true, 'Quantity is required'],
            min: [1, 'Quantity must be at least 1'],
        },
        totalAmount: {
            type: Number,
            required: [true, 'Total amount is required'],
        },
        paymentStatus: {
            type: String,
            enum: ['pending', 'processing', 'completed', 'failed', 'refunded'],
            default: 'pending',
        },
        paymentId: {
            type: String,
            default: '',
        },
        orderStatus: {
            type: String,
            enum: ['placed', 'confirmed', 'shipped', 'delivered', 'cancelled'],
            default: 'placed',
        },
        deliveryAddress: {
            type: String,
            trim: true,
            default: '',
        },
    },
    {
        timestamps: true,
    }
);

orderSchema.index({ buyerId: 1, createdAt: -1 });
orderSchema.index({ farmerId: 1, createdAt: -1 });

module.exports = mongoose.model('Order', orderSchema);
