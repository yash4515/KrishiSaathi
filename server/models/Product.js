const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Product name is required'],
            trim: true,
            maxlength: [200, 'Name cannot exceed 200 characters'],
        },
        category: {
            type: String,
            enum: ['fertilizers', 'seeds', 'tools'],
            required: [true, 'Category is required'],
        },
        brand: {
            type: String,
            trim: true,
            default: '',
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
            min: [0, 'Price must be positive'],
        },
        unit: {
            type: String,
            default: '1 piece',
        },
        description: {
            type: String,
            trim: true,
            maxlength: [1000, 'Description cannot exceed 1000 characters'],
            default: '',
        },
        image: {
            url: { type: String, default: '' },
            publicId: { type: String, default: '' },
        },
        rating: {
            type: Number,
            min: 0,
            max: 5,
            default: 0,
        },
        inStock: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

productSchema.index({ category: 1, inStock: 1 });

module.exports = mongoose.model('Product', productSchema);
