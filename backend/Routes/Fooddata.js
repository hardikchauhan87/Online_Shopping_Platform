const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.post('/data', async (req, res) => {
    try {
        const { categoryName, name, img, options } = req.body; // Expecting img to be a URL
        
        // Validate input data
        if (!categoryName || !name || !img || !Array.isArray(JSON.parse(options)) || JSON.parse(options).length === 0) {
            return res.status(400).json({ success: false, message: 'Invalid data' });
        }

        // Insert data with img as a URL
        const newItem = {
            categoryName,
            name,
            img, // Directly using the image URL
            options: JSON.parse(options) // Parse options since it's stringified in the frontend
        };

        await mongoose.connection.db.collection('data').insertOne(newItem);
        res.json({ success: true });
    } catch (err) {
        console.error('Error saving data:', err);
        res.status(500).json({ success: false, message: 'Failed to save data' });
    }
});

module.exports = router;