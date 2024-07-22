// routes/adminMembership.js
const express = require('express');
const router = express.Router();
const adminMembershipController = require('../controllers/AdminMembershipController');
const { jwtAuthMiddleware } = require('../jwt');

// Admin Membership routes
router.use(jwtAuthMiddleware); // Ensure the admin is authenticated
router.use((req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Only admins can access this resource.' });
    }
    next();
});

router.get('/get', adminMembershipController.getAllMemberships);
router.post('/post', adminMembershipController.createMembership);
router.get('/get/:id', adminMembershipController.getMembershipById);
router.put('/edit/:id', adminMembershipController.updateMembership);
router.delete('/delete/:id', adminMembershipController.deleteMembership);

module.exports = router;
