const express = require('express');
const router = express.Router();
const donationController = require('../controllers/DonationController');
const { jwtAuthMiddleware } = require('../jwt'); // Ensure this is the correct path to your JWT middleware
const userprofile=require('./../controllers/UserController')
// Donation routes
router.post('/donate', jwtAuthMiddleware, donationController.makeDonation);
// router.get('/total-donations', donationController.getTotalDonations);
router.get('/by-date', userprofile.getDonationsByDate);
module.exports = router;
