const Product = require('../models/Product');

// GET /api/products
exports.getProducts = async (req, res, next) => {
    try {
        const { category, search, page = 1, limit = 20 } = req.query;
        const query = {};

        if (category) query.category = category;
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { brand: { $regex: search, $options: 'i' } },
            ];
        }

        const products = await Product.find(query)
            .sort({ rating: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await Product.countDocuments(query);

        res.json({
            success: true,
            data: { products, total, page: parseInt(page), pages: Math.ceil(total / limit) },
        });
    } catch (error) {
        next(error);
    }
};

// GET /api/products/:id
exports.getProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found.' });
        }
        res.json({ success: true, data: { product } });
    } catch (error) {
        next(error);
    }
};

// POST /api/products (admin)
exports.createProduct = async (req, res, next) => {
    try {
        const { name, category, brand, price, unit, description, rating, inStock } = req.body;

        const productData = { name, category, brand, price, unit, description, rating, inStock };

        // Handle image upload
        if (req.file) {
            productData.image = { url: req.file.path, publicId: req.file.filename };
        }

        const product = await Product.create(productData);

        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            data: { product },
        });
    } catch (error) {
        next(error);
    }
};

// PUT /api/products/:id (admin)
exports.updateProduct = async (req, res, next) => {
    try {
        const allowedFields = ['name', 'category', 'brand', 'price', 'unit', 'description', 'rating', 'inStock'];
        const updates = {};
        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        }

        // Handle image upload
        if (req.file) {
            updates.image = { url: req.file.path, publicId: req.file.filename };
        }

        const product = await Product.findByIdAndUpdate(req.params.id, updates, {
            new: true,
            runValidators: true,
        });

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found.' });
        }

        res.json({
            success: true,
            message: 'Product updated successfully',
            data: { product },
        });
    } catch (error) {
        next(error);
    }
};

// DELETE /api/products/:id (admin)
exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found.' });
        }
        res.json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        next(error);
    }
};
