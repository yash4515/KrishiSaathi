const CropListing = require('../models/CropListing');
const Bid = require('../models/Bid');

// GET /api/marketplace
exports.getMarketplace = async (req, res, next) => {
    try {
        const { search, category, minPrice, maxPrice, location, sort, page = 1, limit = 20 } = req.query;
        const query = { status: 'active' };

        if (search) {
            query.$text = { $search: search };
        }
        if (category) {
            query.category = category;
        }
        if (minPrice || maxPrice) {
            query['priceRange.min'] = {};
            if (minPrice) query['priceRange.min'].$gte = parseInt(minPrice);
            if (maxPrice) query['priceRange.max'] = { $lte: parseInt(maxPrice) };
        }
        if (location) {
            query.location = { $regex: location, $options: 'i' };
        }

        let sortObj = { createdAt: -1 };
        if (sort === 'price_asc') sortObj = { 'priceRange.min': 1 };
        if (sort === 'price_desc') sortObj = { 'priceRange.min': -1 };
        if (sort === 'newest') sortObj = { createdAt: -1 };

        const listings = await CropListing.find(query)
            .populate('farmerId', 'name location')
            .sort(sortObj)
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

// POST /api/marketplace/bid
exports.placeBid = async (req, res, next) => {
    try {
        const { listingId, bidAmount, message } = req.body;

        const listing = await CropListing.findById(listingId);
        if (!listing) {
            return res.status(404).json({ success: false, message: 'Listing not found.' });
        }
        if (listing.status !== 'active') {
            return res.status(400).json({ success: false, message: 'Listing is no longer active.' });
        }
        if (listing.farmerId.toString() === req.user._id.toString()) {
            return res.status(400).json({ success: false, message: 'Cannot bid on your own listing.' });
        }

        const bid = await Bid.create({
            listingId,
            buyerId: req.user._id,
            bidAmount,
            message,
        });

        const populatedBid = await Bid.findById(bid._id)
            .populate('buyerId', 'name location')
            .populate('listingId', 'cropName');

        // Emit real-time event
        const io = req.app.get('io');
        if (io) {
            io.to(`listing:${listingId}`).emit('new-bid', {
                bid: populatedBid,
                message: `New bid of ₹${bidAmount} by ${req.user.name}`,
            });
        }

        res.status(201).json({
            success: true,
            message: 'Bid placed successfully',
            data: { bid: populatedBid },
        });
    } catch (error) {
        next(error);
    }
};

// GET /api/marketplace/bids/:listingId
exports.getBids = async (req, res, next) => {
    try {
        const bids = await Bid.find({ listingId: req.params.listingId })
            .populate('buyerId', 'name location')
            .sort({ bidAmount: -1 });

        res.json({ success: true, data: { bids } });
    } catch (error) {
        next(error);
    }
};

// GET /api/marketplace/my-bids
exports.getMyBids = async (req, res, next) => {
    try {
        const { status, page = 1, limit = 20 } = req.query;
        const query = { buyerId: req.user._id };
        if (status) query.status = status;

        const bids = await Bid.find(query)
            .populate('listingId', 'cropName images priceRange status farmerId')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await Bid.countDocuments(query);

        res.json({
            success: true,
            data: { bids, total, page: parseInt(page), pages: Math.ceil(total / limit) },
        });
    } catch (error) {
        next(error);
    }
};

// PUT /api/marketplace/bid/:id/accept
exports.acceptBid = async (req, res, next) => {
    try {
        const bid = await Bid.findById(req.params.id).populate('listingId');
        if (!bid) {
            return res.status(404).json({ success: false, message: 'Bid not found.' });
        }

        // Only the listing owner (farmer) can accept
        const listing = await CropListing.findById(bid.listingId._id || bid.listingId);
        if (!listing) {
            return res.status(404).json({ success: false, message: 'Listing not found.' });
        }
        if (listing.farmerId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'Not authorized to accept this bid.' });
        }
        if (bid.status !== 'pending') {
            return res.status(400).json({ success: false, message: 'Bid is no longer pending.' });
        }

        // Accept this bid
        bid.status = 'accepted';
        await bid.save();

        // Reject all other pending bids for this listing
        await Bid.updateMany(
            { listingId: listing._id, _id: { $ne: bid._id }, status: 'pending' },
            { status: 'rejected' }
        );

        // Mark listing as sold
        listing.status = 'sold';
        await listing.save();

        // Emit real-time event
        const io = req.app.get('io');
        if (io) {
            io.to(`listing:${listing._id}`).emit('bid-accepted', {
                bidId: bid._id,
                message: `Bid of ₹${bid.bidAmount} has been accepted!`,
            });
        }

        const populatedBid = await Bid.findById(bid._id)
            .populate('buyerId', 'name location')
            .populate('listingId', 'cropName');

        res.json({
            success: true,
            message: 'Bid accepted successfully',
            data: { bid: populatedBid },
        });
    } catch (error) {
        next(error);
    }
};

// PUT /api/marketplace/bid/:id/reject
exports.rejectBid = async (req, res, next) => {
    try {
        const bid = await Bid.findById(req.params.id);
        if (!bid) {
            return res.status(404).json({ success: false, message: 'Bid not found.' });
        }

        const listing = await CropListing.findById(bid.listingId);
        if (!listing) {
            return res.status(404).json({ success: false, message: 'Listing not found.' });
        }
        if (listing.farmerId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'Not authorized to reject this bid.' });
        }
        if (bid.status !== 'pending') {
            return res.status(400).json({ success: false, message: 'Bid is no longer pending.' });
        }

        bid.status = 'rejected';
        await bid.save();

        // Emit real-time event
        const io = req.app.get('io');
        if (io) {
            io.to(`listing:${listing._id}`).emit('bid-rejected', {
                bidId: bid._id,
                message: 'A bid has been rejected.',
            });
        }

        res.json({
            success: true,
            message: 'Bid rejected successfully',
            data: { bid },
        });
    } catch (error) {
        next(error);
    }
};

// DELETE /api/marketplace/bid/:id
exports.withdrawBid = async (req, res, next) => {
    try {
        const bid = await Bid.findById(req.params.id);
        if (!bid) {
            return res.status(404).json({ success: false, message: 'Bid not found.' });
        }
        if (bid.buyerId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'Not authorized to withdraw this bid.' });
        }
        if (bid.status !== 'pending') {
            return res.status(400).json({ success: false, message: 'Only pending bids can be withdrawn.' });
        }

        bid.status = 'withdrawn';
        await bid.save();

        res.json({ success: true, message: 'Bid withdrawn successfully' });
    } catch (error) {
        next(error);
    }
};
