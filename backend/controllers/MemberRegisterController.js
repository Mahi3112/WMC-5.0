const Event = require('../models/EventModel');
const Registration = require('../models/MemberRegisterforEventModel');
const User = require('../models/UserModel');

// Register for an event with virtual currency payment
// const registerEvent = async (req, res) => {
//     try {
//         const eventId = req.params.id; // Ensure this is extracted correctly
//         const userId = req.user?.id;  // Ensure req.user is properly set by your authentication middleware
//         const { numMembers, email } = req.body;

//         if (!userId) {
//             console.error('User ID is not set in request');
//             return res.status(401).json({ message: 'Unauthorized' });
//         }

//         console.log('Event ID:', eventId);
//         console.log('User ID:', userId);
//         console.log('Request Body:', req.body);

//         // Fetch user and check virtual currency balance
//         const user = await User.findById(userId);
//         if (!user) {
//             console.error('User not found');
//             return res.status(404).json({ message: 'User not found' });
//         }

//         if (user.role !== 'member') {
//             console.error('User is not a member');
//             return res.status(403).json({ message: 'Only members can register for events' });
//         }

//         // Fetch event details
//         const event = await Event.findById(eventId);
//         if (!event) {
//             console.error('Event not found');
//             return res.status(404).json({ message: 'Event not found' });
//         }

//         const paymentRate = 100; // Assuming a fixed rate
//         const totalPaymentAmount = numMembers * paymentRate;

//         if (user.virtualCurrency < totalPaymentAmount) {
//             console.error('Insufficient virtual currency');
//             return res.status(400).json({ message: 'Insufficient virtual currency' });
//         }

//         // Deduct virtual currency
//         user.virtualCurrency -= totalPaymentAmount;
//         await user.save();

//         // Create a new registration
//         const newRegistration = new Registration({
//             event: eventId,
//             user: userId,
//             email,
//             numMembers,
//             paymentAmount: totalPaymentAmount
//         });
//         await newRegistration.save();

//         res.status(201).json({ 
//             message: `Registered for event "${event.title}" successfully`, 
//             virtualCurrency: user.virtualCurrency 
//         });
//     } catch (error) {
//         console.error('Error in registerEvent function:', error);
//         res.status(500).json({ message: 'Error registering for event', error: error.message || error });
//     }
// };

const registerEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const userId = req.user?.id;  // Ensure req.user is properly set by your authentication middleware
        const { numMembers, email } = req.body;

        if (!userId) {
            console.error('User ID is not set in request');
            return res.status(401).json({ message: 'Unauthorized' });
        }

        console.log('Event ID:', eventId);
        console.log('User ID:', userId);
        console.log('Request Body:', req.body);

        // Fetch user and check virtual currency balance
        const user = await User.findById(userId);
        if (!user) {
            console.error('User not found');
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.role !== 'member') {
            console.error('User is not a member');
            return res.status(403).json({ message: 'Only members can register for events' });
        }

        // Find the event and update registration count
        const event = await Event.findById(eventId);
        if (!event) {
            console.error('Event not found');
            return res.status(404).json({ message: 'Event not found' });
        }

        const totalPaymentAmount = numMembers * 100; // Assuming a fixed rate for simplicity

        if (user.virtualCurrency < totalPaymentAmount) {
            console.error('Insufficient virtual currency');
            return res.status(400).json({ message: 'Insufficient virtual currency' });
        }

        // Deduct virtual currency
        user.virtualCurrency -= totalPaymentAmount;
        await user.save();

        // Increment registration count
        event.registrationCount += numMembers;
        await event.save();

        // Create a new registration
        const newRegistration = new Registration({
            event: eventId,
            user: userId,
            email,
            numMembers,
            paymentAmount: totalPaymentAmount
        });
        await newRegistration.save();

        res.status(201).json({ 
            message: `Registered for event "${event.title}" successfully`, 
            virtualCurrency: user.virtualCurrency 
        });
    } catch (error) {
        console.error('Error in registerEvent function:', error);
        res.status(500).json({ message: 'Error registering for event', error: error.message || error });
    }
};

const getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        console.error('Error in getEvents function:', error.message || error);
        res.status(500).json({ message: 'Internal server error', error: error.message || error });
    }
};

module.exports = { registerEvent, getEvents };
