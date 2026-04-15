const express = require('express');
const router = express.Router();
// const nodemailer = require('nodemailer');

/**
 * SRS NOTE: Nodemailer configuration placeholder.
 * You will need to provide actual SMTP credentials in the .env file.
 */
/*
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
*/

// @route   POST /api/inquiry/quote
// @desc    Handle incoming Request A Quote form submissions
router.post('/quote', async (req, res) => {
  try {
    const { name, email, company, service, budget, details } = req.body;
    
    // Simulate database saving or validation logic here
    console.log(`[LEAD] New Quote Request from ${name} (${company}) for ${service}`);

    /*
    await transporter.sendMail({
      from: '"Sivion Hub" <no-reply@sivionhub.tech>',
      to: 'sales@sivionhub.tech',
      subject: `New Enterprise Quote Request: ${company}`,
      html: `<h3>New Lead</h3><p>Name: ${name}</p><p>Budget: ${budget}</p><p>Details: ${details}</p>`,
    });
    */

    return res.status(200).json({ success: true, message: "Quote request received successfully. Our architects will contact you." });
  } catch (error) {
    console.error("Quote Submission Error:", error);
    return res.status(500).json({ success: false, message: "Failed to process quote request." });
  }
});

// @route   POST /api/inquiry/contact
// @desc    Handle standard Contact form submissions
router.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    console.log(`[INQUIRY] New Contact Message from ${name}`);
    
    // Email dispatch logic goes here
    
    return res.status(200).json({ success: true, message: "Message received." });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

module.exports = router;
