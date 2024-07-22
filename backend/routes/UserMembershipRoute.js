// routes/memberMembership.js
const express = require('express');
const router = express.Router();
const memberMembershipController = require('../controllers/UserMembershipController');
const { jwtAuthMiddleware } = require('../jwt');

// Member Membership routes
router.use(jwtAuthMiddleware); // Ensure the member is authenticated

router.get('/get-membership', memberMembershipController.getAvailableMemberships);
router.get('/get-membership/:id', memberMembershipController.getMembershipDetails);
router.post('/purchase/:id', memberMembershipController.purchaseMembership);

module.exports = router;
