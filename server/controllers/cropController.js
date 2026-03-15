const CropListing = require('../models/CropListing');
const cloudinary = require('../config/cloudinary');

// POST /api/crops/add
exports.addCrop = async (req, res, next) => {
    try {
        const { cropName, quantity, priceRange, description, category, location, unit } = req.body;

        const images = [];
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                images.push({ url: file.path, publicId: file.filename });
            }
        }

        const listing = await CropListing.create({
            farmerId: req.user._id,
            cropName,
            quantity,
            unit,
            priceRange: typeof priceRange === 'string' ? JSON.parse(priceRange) : priceRange,
            description,
            images,
            category,
            location: location || req.user.location,
        });

        res.status(201).json({
            success: true,
            message: 'Crop listing created successfully',
            data: { listing },
        });
    } catch (error) {
        next(error);
    }
};

// GET /api/crops/my-listings
exports.getMyListings = async (req, res, next) => {
    try {
        const { status, page = 1, limit = 20 } = req.query;
        const query = { farmerId: req.user._id };
        if (status) query.status = status;

        const listings = await CropListing.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await CropListing.countDocuments(query);

        res.json({
            success: true,
            data: { listings, total, page: parseInt(page), pages: Math.ceil(total / limit) },
        });
    } catch (error) {
        next(error);
    }
};

// PUT /api/crops/:id
exports.updateCrop = async (req, res, next) => {
    try {
        const listing = await CropListing.findById(req.params.id);

        if (!listing) {
            return res.status(404).json({ success: false, message: 'Listing not found.' });
        }
        if (listing.farmerId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'Not authorized to update this listing.' });
        }

        const allowedFields = ['cropName', 'quantity', 'unit', 'priceRange', 'description', 'category', 'location', 'status'];
        const updates = {};
        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                if (field === 'priceRange' && typeof req.body[field] === 'string') {
                    updates[field] = JSON.parse(req.body[field]);
                } else {
                    updates[field] = req.body[field];
                }
            }
        }

        // Handle new image uploads
        if (req.files && req.files.length > 0) {
            const newImages = req.files.map((file) => ({
                url: file.path,
                publicId: file.filename,
            }));
            updates.images = [...(listing.images || []), ...newImages];
        }

        const updated = await CropListing.findByIdAndUpdate(req.params.id, updates, {
            new: true,
            runValidators: true,
        });

        res.json({
            success: true,
            message: 'Listing updated successfully',
            data: { listing: updated },
        });
    } catch (error) {
        next(error);
    }
};

// DELETE /api/crops/:id
exports.deleteCrop = async (req, res, next) => {
    try {
        const listing = await CropListing.findById(req.params.id);

        if (!listing) {
            return res.status(404).json({ success: false, message: 'Listing not found.' });
        }
        if (listing.farmerId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'Not authorized to delete this listing.' });
        }

        // Delete images from Cloudinary
        for (const img of listing.images) {
            if (img.publicId) {
                try {
                    await cloudinary.uploader.destroy(img.publicId);
                } catch (e) {
                    console.error('Cloudinary delete error (non-blocking):', e.message);
                }
            }
        }

        await CropListing.findByIdAndDelete(req.params.id);

        res.json({ success: true, message: 'Listing deleted successfully' });
    } catch (error) {
        next(error);
    }
};

// GET /api/crops/:id
exports.getCrop = async (req, res, next) => {
    try {
        const listing = await CropListing.findById(req.params.id).populate('farmerId', 'name phone location');
        if (!listing) {
            return res.status(404).json({ success: false, message: 'Listing not found.' });
        }
        res.json({ success: true, data: { listing } });
    } catch (error) {
        next(error);
    }
};
