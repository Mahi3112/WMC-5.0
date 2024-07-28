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
        const { membershipName } = req.body;
        if (!membershipName) {
            return res.status(400).json({ message: 'Membership name is required' });
        }

        const membership = await Membership.findOne({ name: membershipName });
        if (!membership) {
            return res.status(404).json({ message: 'Membership not found' });
        }

        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.virtualCurrency < membership.price) {
            return res.status(400).json({ message: 'Insufficient virtual currency' });
        }

        // Check if the user already has a membership
        if (user.membershipStatus && user.membershipStatus !== membershipName) {
            return res.status(400).json({ message: 'You already have an active membership. Please cancel the current one before purchasing a new one.' });
        }

        user.virtualCurrency -= membership.price;
        user.membershipStatus = membershipName;
        await user.save();

        res.status(200).json({ message: 'Membership purchased successfully', virtualCurrency: user.virtualCurrency });
    } catch (error) {
        console.error('Error purchasing membership:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.cancelMembership = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Ensure the user has an active membership before trying to cancel
        if (!user.membershipStatus) {
            return res.status(400).json({ message: 'No active membership to cancel' });
        }

        user.membershipStatus = null;
        await user.save();

        res.status(200).json({ message: 'Membership cancelled successfully' });
    } catch (error) {
        console.error('Error cancelling membership:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};