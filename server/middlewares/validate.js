const { body, param, validationResult } = require('express-validator');

// Handle validation results
const handleValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
        });
    }
    next();
};

// Auth validations
const validateRegister = [
    body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
    body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
    body('phone').trim().notEmpty().withMessage('Phone is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('role').isIn(['farmer', 'buyer']).withMessage('Role must be farmer or buyer'),
    handleValidation,
];

const validateLogin = [
    body('email')
        .trim()
        .notEmpty().withMessage('Email or phone number is required')
        .custom((value) => {
            const isEmail = /^\S+@\S+\.\S+$/.test(value);
            const isPhone = /^[+]?[\d\s-]{10,15}$/.test(value);
            if (!isEmail && !isPhone) {
                throw new Error('Please provide a valid email or phone number');
            }
            return true;
        }),
    body('password').notEmpty().withMessage('Password is required'),
    handleValidation,
];

const validateProfile = [
    body('name').optional().trim().isLength({ min: 1, max: 100 }).withMessage('Name must be 1-100 characters'),
    body('phone').optional().trim().notEmpty().withMessage('Phone cannot be empty'),
    body('location').optional().trim(),
    handleValidation,
];

// Crop validations
const validateCrop = [
    body('cropName').trim().notEmpty().withMessage('Crop name is required'),
    body('quantity').isNumeric().withMessage('Quantity must be a number'),
    handleValidation,
];

// Bid validation
const validateBid = [
    body('listingId').isMongoId().withMessage('Valid listing ID is required'),
    body('bidAmount').isNumeric().withMessage('Bid amount must be a number').isFloat({ min: 1 }),
    handleValidation,
];

// Order validation
const validateOrder = [
    body('listingId').isMongoId().withMessage('Valid listing ID is required'),
    body('quantity').isNumeric().withMessage('Quantity must be a number'),
    body('totalAmount').isNumeric().withMessage('Total amount must be a number'),
    handleValidation,
];

// Order status validation
const validateOrderStatus = [
    body('orderStatus')
        .isIn(['confirmed', 'shipped', 'delivered', 'cancelled'])
        .withMessage('Invalid order status'),
    handleValidation,
];

// Product validation
const validateProduct = [
    body('name').trim().notEmpty().withMessage('Product name is required'),
    body('category').isIn(['fertilizers', 'seeds', 'tools']).withMessage('Category must be fertilizers, seeds, or tools'),
    body('price').isNumeric().withMessage('Price must be a number').isFloat({ min: 0 }),
    handleValidation,
];

// Insurance validation
const validateInsurance = [
    body('name').trim().notEmpty().withMessage('Insurance plan name is required'),
    body('coverage').trim().notEmpty().withMessage('Coverage is required'),
    body('premium').trim().notEmpty().withMessage('Premium is required'),
    handleValidation,
];

// Param ID validation
const validateId = [
    param('id').isMongoId().withMessage('Invalid ID format'),
    handleValidation,
];

module.exports = {
    validateRegister,
    validateLogin,
    validateProfile,
    validateCrop,
    validateBid,
    validateOrder,
    validateOrderStatus,
    validateProduct,
    validateInsurance,
    validateId,
};
