const cloudinary = require('../config/cloudinary');

// Upload image to Cloudinary
exports.uploadImage = async (filePath, folder = 'krishisaathi') => {
    const result = await cloudinary.uploader.upload(filePath, {
        folder,
        transformation: [{ width: 800, height: 600, crop: 'limit', quality: 'auto' }],
    });
    return {
        url: result.secure_url,
        publicId: result.public_id,
    };
};

// Delete image from Cloudinary
exports.deleteImage = async (publicId) => {
    await cloudinary.uploader.destroy(publicId);
};

// Delete multiple images
exports.deleteImages = async (publicIds) => {
    const results = await Promise.allSettled(
        publicIds.map((id) => cloudinary.uploader.destroy(id))
    );
    return results;
};
