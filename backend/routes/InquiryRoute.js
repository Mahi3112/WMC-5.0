const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');
const { isAdmin } = require('../middlewares/isAdmin');
const { isMember } = require('../middlewares/isMember');
const { jwtAuthMiddleware } = require('../jwt');

// Post an inquiry (member only)
router.use(jwtAuthMiddleware);
router.post('/', jwtAuthMiddleware, isMember, async (req, res) => {
  try {
    const { query } = req.body;
    const { username, id } = req.user; // Extract from req.user

    if (!username) {
      return res.status(400).json({ message: 'Username not found' });
    }

    const newInquiry = new Inquiry({
      userId: id, // Use user ID from the JWT payload
      query,
      username // Store username in the document if needed
    });

    await newInquiry.save();
    res.status(201).json(newInquiry);
  } catch (error) {
    res.status(500).json({ message: 'Error posting inquiry', error });
  }
});


// Get all inquiries (admin only)
router.get('/', isAdmin, async (req, res) => {
  try {
    const inquiries = await Inquiry.find().populate('userId', 'username');
    res.status(200).json(inquiries);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching inquiries', error });
  }
});

module.exports = router;
