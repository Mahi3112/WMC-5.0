const Membership = require('../models/MembershipModel');
const User = require('../models/UserModel');

exports.getAllMemberships = async (req, res) => {
    try {
        // Fetch all memberships
        const memberships = await Membership.find();
        
        // Get membership counts
        const membershipCounts = await Promise.all(memberships.map(async (membership) => {
            const count = await User.countDocuments({ membershipStatus: membership.name });
            return {
                ...membership.toObject(),
                memberCount: count
            };
        }));

        res.status(200).json(membershipCounts);
    } catch (error) {
        console.error('Error fetching memberships:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.createMembership = async (req, res) => {
    try {
        const { name, price, benefits } = req.body;

        const newMembership = new Membership({
            name,
            price,
            benefits
        });

        const savedMembership = await newMembership.save();
        res.status(201).json(savedMembership);
    } catch (error) {
        console.error('Error creating membership:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getMembershipById = async (req, res) => {
    try {
        const membership = await Membership.findById(req.params.id);
        if (!membership) {
            return res.status(404).json({ message: 'Membership not found' });
        }
        res.status(200).json(membership);
    } catch (error) {
        console.error('Error fetching membership:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.updateMembership = async (req, res) => {
    try {
        const { name, price, benefits } = req.body;

        const updatedMembership = await Membership.findByIdAndUpdate(req.params.id, {
            name,
            price,
            benefits
        }, { new: true });

        if (!updatedMembership) {
            return res.status(404).json({ message: 'Membership not found' });
        }

        res.status(200).json(updatedMembership);
    } catch (error) {
        console.error('Error updating membership:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.deleteMembership = async (req, res) => {
    try {
        const deletedMembership = await Membership.findByIdAndDelete(req.params.id);
        if (!deletedMembership) {
            return res.status(404).json({ message: 'Membership not found' });
        }
        res.status(200).json({ message: 'Membership deleted successfully' });
    } catch (error) {
        console.error('Error deleting membership:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
