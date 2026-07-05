const Detection = require('../models/Detection');
const axios = require('axios');
const FormData = require('form-data');

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:5005';

// POST /api/detection/predict
exports.detectDisease = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Please upload an image.' });
        }

        // Forward image to Python AI service
        const formData = new FormData();
        formData.append('image', req.file.buffer, {
            filename: req.file.originalname,
            contentType: req.file.mimetype,
        });

        let aiResponse;
        try {
            const url = new URL('/predict', AI_SERVICE_URL).toString();
            const response = await axios.post(url, formData, {
                headers: formData.getHeaders(),
            });
            aiResponse = response.data;
        } catch (err) {
            const statusCode = err.response ? err.response.status : 'unknown';
            console.error(`❌ AI service error:`, err.message, err.response ? err.response.data : '');
            throw new Error(`AI service returned status code ${statusCode}`);
        }

        if (!aiResponse.success) {
            return res.status(502).json({
                success: false,
                message: aiResponse.detail || 'AI service returned an error.',
            });
        }

        const { crop, disease, confidence, treatment, class_key } = aiResponse.data;

        // Save to database only if user is logged in
        let detection = { crop, disease, confidence, treatment, classKey: class_key || '' };
        if (req.user) {
            detection = await Detection.create({
                userId: req.user._id,
                ...detection,
            });
        }

        res.json({
            success: true,
            message: 'Disease detected successfully',
            data: { detection },
        });
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(503).json({
                success: false,
                message: 'AI service is not running. Please start the Python AI service on port 5005.',
            });
        }
        next(error);
    }
};

// GET /api/detection/history
exports.getHistory = async (req, res, next) => {
    try {
        const detections = await Detection.find({ userId: req.user._id })
            .sort({ createdAt: -1 })
            .limit(50);

        res.json({
            success: true,
            data: { detections },
        });
    } catch (error) {
        next(error);
    }
};
