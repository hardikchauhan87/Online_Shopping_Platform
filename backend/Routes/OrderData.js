const express = require('express');
const router = express.Router();
const Order = require('../models/Orders'); // Ensure you import your Order model

// Route to handle order data submission
router.post('/orderData', async (req, res) => {
    try {
        // Check for required fields
        if (!req.body.email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }
        if (!Array.isArray(req.body.order_data)) {
            return res.status(400).json({ success: false, message: "Order data should be an array" });
        }

        // Prepare order data
        const orderData = [...req.body.order_data]; // Clone the order_data array
        orderData.unshift({ Order_date: req.body.order_date }); // Add order date

        console.log("Processing order for:", req.body.email);

        // Check if the order already exists
        let existingOrder = await Order.findOne({ email: req.body.email });

        if (!existingOrder) {
            // Create a new order if none exists
            await Order.create({
                email: req.body.email,
                order_data: [orderData]
            });
        } else {
            // Update existing order
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: orderData } }
            );
        }
        res.json({ success: true });
    } catch (error) {
        console.error("Error processing order:", error.message);
        res.status(500).json({ success: false, message: error.message }); // Return error message to client
    }
});

// Route to fetch user order data
router.post('/myorderData', async (req, res) => {
    try {
        // Ensure email is provided
        if (!req.body.email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        // Find order by email
        const mydata = await Order.findOne({ email: req.body.email });

        if (!mydata) {
            return res.status(404).json({ success: false, message: "No orders found for this email" });
        }

        // Return the order data
        res.json({ success: true, orderData: mydata });
    } catch (error) {
        console.error("Error fetching order data:", error.message);
        res.status(500).json({ success: false, message: error.message }); // Return error message to client
    }
});


module.exports = router; 
