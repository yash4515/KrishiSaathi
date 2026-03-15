const mongoose = require('mongoose');

const insuranceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Insurance plan name is required'],
            trim: true,
        },
        cropName: {
            type: String,
            trim: true,
            default: 'All Crops',
        },
        coverage: {
            type: String,
            required: [true, 'Coverage is required'],
        },
        premium: {
            type: String,
            required: [true, 'Premium is required'],
        },
        duration: {
            type: String,
            default: '1 Season',
        },
        features: [
            {
                type: String,
            },
        ],
        crops: [
            {
                type: String,
            },
        ],
        popular: {
            type: Boolean,
            default: false,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Insurance', insuranceSchema);
