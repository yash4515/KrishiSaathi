const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    });
};

// POST /api/auth/register
exports.register = async (req, res, next) => {
    try {
        const { name, email, phone, password, role, location } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already registered.' });
        }

        const user = await User.create({ name, email, phone, password, role, location });
        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: 'Registration successful',
            data: { user, token },
        });
    } catch (error) {
        next(error);
    }
};

// POST /api/auth/login
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid email or password.' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid email or password.' });
        }

        const token = generateToken(user._id);

        res.json({
            success: true,
            message: 'Login successful',
            data: { user, token },
        });
    } catch (error) {
        next(error);
    }
};

// GET /api/auth/me
exports.getMe = async (req, res, next) => {
    try {
        res.json({ success: true, data: { user: req.user } });
    } catch (error) {
        next(error);
    }
};

// PUT /api/auth/profile
exports.updateProfile = async (req, res, next) => {
    try {
        const allowedFields = ['name', 'phone', 'location', 'avatar'];
        const updates = {};
        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        }

        const user = await User.findByIdAndUpdate(req.user._id, updates, {
            new: true,
            runValidators: true,
        });

        res.json({
            success: true,
            message: 'Profile updated successfully',
            data: { user },
        });
    } catch (error) {
        next(error);
    }
};
