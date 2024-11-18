// models/Category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  CategoryName: {
    type: String,
    required: true,
    unique: true 
  }
}, { collection: 'foodCategory' }); 

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
