const mongoose = require('mongoose');

// Define the SupportUser schema
const supportUserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
  },
  password: {
    type: String,
    required: true,
  },
});

// Create the model
const SupportUser = mongoose.model('SupportUser', supportUserSchema);

module.exports = SupportUser;
