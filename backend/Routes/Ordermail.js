const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Create a transporter using your email and password
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ihardikchauhan870@gmail.com', // Your email
    pass: 'dxzp xscn oqty bgbt', // Your email password
  },
});

// Route to handle shipping status and sending email
router.post('/ship-order', async (req, res) => {
  const { email, orderItemName } = req.body;

  const mailOptions = {
    from: 'ihardik870@gmail.com',
    to: email,
    subject: 'Your item has been shipped!',
    text: `Your item "${orderItemName}" has been shipped and is on its way!`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: 'Failed to send email' });
    }
    console.log('Email sent: ' + info.response);
    res.json({ success: true, message: 'Email sent successfully' });
  });
});

module.exports = router;
