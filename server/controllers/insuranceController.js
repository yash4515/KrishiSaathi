const Insurance = require('../models/Insurance');

// GET /api/insurance
exports.getPlans = async (req, res, next) => {
    try {
        const plans = await Insurance.find({ isActive: true }).sort({ popular: -1 });
        res.json({ success: true, data: { plans } });
    } catch (error) {
        next(error);
    }
};

// GET /api/insurance/:id
exports.getPlan = async (req, res, next) => {
    try {
        const plan = await Insurance.findById(req.params.id);
        if (!plan) {
            return res.status(404).json({ success: false, message: 'Insurance plan not found.' });
        }
        res.json({ success: true, data: { plan } });
    } catch (error) {
        next(error);
    }
};

// POST /api/insurance (admin)
exports.createPlan = async (req, res, next) => {
    try {
        const { name, cropName, coverage, premium, duration, features, crops, popular } = req.body;

        const plan = await Insurance.create({
            name,
            cropName,
            coverage,
            premium,
            duration,
            features,
            crops,
            popular,
        });

        res.status(201).json({
            success: true,
            message: 'Insurance plan created successfully',
            data: { plan },
        });
    } catch (error) {
        next(error);
    }
};

// PUT /api/insurance/:id (admin)
exports.updatePlan = async (req, res, next) => {
    try {
        const allowedFields = ['name', 'cropName', 'coverage', 'premium', 'duration', 'features', 'crops', 'popular', 'isActive'];
        const updates = {};
        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        }

        const plan = await Insurance.findByIdAndUpdate(req.params.id, updates, {
            new: true,
            runValidators: true,
        });

        if (!plan) {
            return res.status(404).json({ success: false, message: 'Insurance plan not found.' });
        }

        res.json({
            success: true,
            message: 'Insurance plan updated successfully',
            data: { plan },
        });
    } catch (error) {
        next(error);
    }
};

// DELETE /api/insurance/:id (admin) — soft delete
exports.deletePlan = async (req, res, next) => {
    try {
        const plan = await Insurance.findByIdAndUpdate(
            req.params.id,
            { isActive: false },
            { new: true }
        );

        if (!plan) {
            return res.status(404).json({ success: false, message: 'Insurance plan not found.' });
        }

        res.json({ success: true, message: 'Insurance plan deactivated successfully' });
    } catch (error) {
        next(error);
    }
};
