// controllers/memberMembershipController.js
const Membership = require('../models/MembershipModel');
const User = require('../models/UserModel');

exports.getAvailableMemberships = async (req, res) => {
    try {
        const memberships = await Membership.find();
        res.status(200).json(memberships);
    } catch (error) {
        console.error('Error fetching memberships:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getMembershipDetails = async (req, res) => {
    try {
        const membership = await Membership.findById(req.params.id);
        if (!membership) {
            return res.status(404).json({ message: 'Membership not found' });
        }
        res.status(200).json(membership);
    } catch (error) {
        console.error('Error fetching membership details:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.purchaseMembership = async (req, res) => {
    try {
        const userId = req.user.id;
        const membershipId = req.params.id;

        const membership = await Membership.findById(membershipId);
        if (!membership) {
            return res.status(404).json({ message: 'Membership not found' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user has enough balance (assuming a balance check is needed)
        if (user.virtualCurrency < membership.price) {
            return res.status(400).json({ message: 'Insufficient virtual currency' });
        }

        // Deduct the amount and update user membership
        user.virtualCurrency -= membership.price;
        user.membershipStatus = membership.name; // Update user's membership status
        await user.save();

        res.status(200).json({ message: 'Membership purchased successfully', virtualCurrency: user.virtualCurrency });
    } catch (error) {
        console.error('Error purchasing membership:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
