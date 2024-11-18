const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Route to create a new category
router.post('/foodCategory', async (req, res) => {
  const { CategoryName } = req.body;

  if (!CategoryName) {
    return res.status(400).json({ success: false, message: "CategoryName is required" });
  }

  try {
    const newCategory = new Category({ CategoryName });
    await newCategory.save();
    res.json({ success: true, message: "Category uploaded successfully", category: newCategory });
  } catch (error) {
    console.error("Error uploading category:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
