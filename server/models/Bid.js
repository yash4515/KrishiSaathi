const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema(
    {
        listingId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CropListing',
            required: [true, 'Listing ID is required'],
        },
        buyerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Buyer ID is required'],
        },
        bidAmount: {
            type: Number,
            required: [true, 'Bid amount is required'],
            min: [1, 'Bid amount must be positive'],
        },
        status: {
            type: String,
            enum: ['pending', 'accepted', 'rejected', 'withdrawn'],
            default: 'pending',
        },
        message: {
            type: String,
            trim: true,
            maxlength: [500, 'Message cannot exceed 500 characters'],
            default: '',
        },
    },
    {
        timestamps: true,
    }
);

bidSchema.index({ listingId: 1, buyerId: 1 });
bidSchema.index({ buyerId: 1, status: 1 });

module.exports = mongoose.model('Bid', bidSchema);
