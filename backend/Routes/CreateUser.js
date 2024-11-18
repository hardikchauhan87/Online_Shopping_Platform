const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const SupportUser=require('../models/SupportUser')
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const jwtSecret = "myselfhardikandthisisjwtusedforprotection";

// User registration route
router.post("/createuser",
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', 'incorrect pass').isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10);
        let secPass = await bcrypt.hash(req.body.password, salt);
        console.log("Hashed Password:", secPass); // Log hashed password

        try {
            await User.create({
                name: req.body.name,
                password: secPass, // Save hashed password
                email: req.body.email,
                location: req.body.location
            });
            res.json({ success: true });
        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    }
);

// User login route
router.post("/loginuser",
    async (req, res) => {
        try {
            const email = req.body.email;
            const usermail = await User.findOne({ email });

            if (!usermail) {
                return res.status(400).json({ errors: "Wrong Email" });
            }

            console.log("User Found:", usermail); // Log user details

            const enteredPassword = req.body.password;
            const hashedPassword = usermail.password; // Hashed password from DB
            console.log("Entered Password:", enteredPassword); // Log the entered password
            console.log("Hashed Password from DB:", hashedPassword); // Log hashed password from DB

            const pwdCompare = await bcrypt.compare(enteredPassword, hashedPassword);
            console.log("Password Comparison Result:", pwdCompare); // Log comparison result

            if (!pwdCompare) {
                return res.status(400).json({ errors: "Incorrect password" });
            }

            const data = {
                user: {
                    id: usermail.id
                }
            };

            const authToken = jwt.sign(data, jwtSecret, { expiresIn: '1h' });
            return res.json({ success: true, authToken: authToken });
        } catch (error) {
            console.error(error);
            res.json({ success: false });
        }
    }
);

// Post request to fetch all users
router.post('/users', async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 }); // Exclude password from response
        res.json({ users }); // Respond with the users
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: 'Error fetching users' });
    }
});


router.post('/user/orders', async (req, res) => {
    const { email } = req.body;  // Email provided by the client

    try {
        // Fetch orders based on email from 'orders' collection
        const orders = await mongoose.connection.db.collection('orders').find({ email }).toArray();

        if (!orders || orders.length === 0) {
            return res.status(404).json({ success: false, message: 'No orders found for this user' });
        }

        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});


router.post('/createSupportUser', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Create a new support user without hashing the password
      const newSupportUser = new SupportUser({
        email,
        password, // Store password as is (plain text)
      });
  
      // Save the new support user to the database
      await newSupportUser.save();
  
      res.json({ success: true, message: 'Support user created successfully!' });
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: 'Error creating support user' });
    }
  });
  
  // POST route for support user login
  router.post('/loginSupportUser', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find the support user by email
      const supportUser = await SupportUser.findOne({ email });
  
      if (!supportUser) {
        return res.json({ success: false, message: 'Support user not found' });
      }
  
      // Compare the plain text password (since no hashing is used)
      if (supportUser.password !== password) {
        return res.json({ success: false, message: 'Invalid credentials' });
      }
  
      // If login is successful, return a success message and an auth token

      const authToken = 'static-support-auth-token';
  
      res.json({ success: true, authToken, message: 'Login successful' });
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: 'Error during login' });
    }
  });
  
  module.exports = router;
  

module.exports = router;
