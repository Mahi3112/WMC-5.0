// routes/memberMembership.js
const express = require('express');
const router = express.Router();
const memberMembershipController = require('../controllers/UserMembershipController');
const { jwtAuthMiddleware } = require('../jwt');

// Member Membership routes


router.get('/get-membership', memberMembershipController.getAvailableMemberships);
router.get('/get-membership/:id',jwtAuthMiddleware, memberMembershipController.getMembershipDetails);
router.post('/purchase',jwtAuthMiddleware, memberMembershipController.purchaseMembership);
router.post('/cancel', jwtAuthMiddleware, memberMembershipController.cancelMembership); // New route for cancelling membership

module.exports = router;
