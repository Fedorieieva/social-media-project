require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const express = require('express');
const queryCreator = require("../commonHelpers/queryCreator");


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.deleteImageFromCloudinary = async (req, res, next) => {
    const {publicId} = req.body;

    try {
        const result = await cloudinary.uploader.destroy(publicId);
        res.status(200).json({message: 'Image deleted successfully', result});
    } catch (error) {
        res.status(500).json({error: 'Failed to delete image', details: error.message});
    }
};
