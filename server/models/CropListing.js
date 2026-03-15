const mongoose = require('mongoose');

const cropListingSchema = new mongoose.Schema(
    {
        farmerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Farmer ID is required'],
        },
        cropName: {
            type: String,
            required: [true, 'Crop name is required'],
            trim: true,
            maxlength: [100, 'Crop name cannot exceed 100 characters'],
        },
        quantity: {
            type: Number,
            required: [true, 'Quantity is required'],
            min: [1, 'Quantity must be at least 1'],
        },
        unit: {
            type: String,
            enum: ['kg', 'quintal', 'ton'],
            default: 'kg',
        },
        priceRange: {
            min: {
                type: Number,
                required: [true, 'Minimum price is required'],
            },
            max: {
                type: Number,
                required: [true, 'Maximum price is required'],
            },
        },
        description: {
            type: String,
            trim: true,
            maxlength: [1000, 'Description cannot exceed 1000 characters'],
            default: '',
        },
        images: [
            {
                url: { type: String, required: true },
                publicId: { type: String, required: true },
            },
        ],
        category: {
            type: String,
            enum: ['grains', 'vegetables', 'fruits', 'pulses', 'spices', 'cash_crops', 'other'],
            default: 'other',
        },
        location: {
            type: String,
            trim: true,
            default: '',
        },
        status: {
            type: String,
            enum: ['active', 'sold', 'expired', 'draft'],
            default: 'active',
        },
    },
    {
        timestamps: true,
    }
);

// Index for search
cropListingSchema.index({ cropName: 'text', location: 'text' });
cropListingSchema.index({ farmerId: 1, status: 1 });
cropListingSchema.index({ category: 1, status: 1 });

module.exports = mongoose.model('CropListing', cropListingSchema);
