const Donation = require('../models/DonationModel');
const User = require('../models/UserModel');

exports.makeDonation = async (req, res) => {
    try {
        const { amount } = req.body;
        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.virtualCurrency < amount) {
            return res.status(400).json({ message: 'Insufficient virtual currency' });
        }

        // Deduct virtual currency
        user.virtualCurrency -= amount;
        await user.save();

        // Create a new donation
        const newDonation = new Donation({
            user: userId,
            amount
        });
        await newDonation.save();

        res.status(201).json({ message: 'Donation made successfully', virtualCurrency: user.virtualCurrency });
    } catch (error) {
        console.error('Error making donation:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getTotalDonations = async (req, res) => {
    try {
        const totalDonations = await Donation.aggregate([
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);

        const total = totalDonations[0]?.total || 0;
        res.status(200).json({ total });
    } catch (error) {
        console.error('Error fetching total donations:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
