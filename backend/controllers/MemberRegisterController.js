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

// const registerEvent = async (req, res) => {
//     try {
//         const eventId = req.params.id;
//         const userId = req.user?.id;

//         if (!userId) {
//             console.error('User ID is not set in request');
//             return res.status(401).json({ message: 'Unauthorized' });
//         }

//         console.log('Event ID:', eventId);
//         console.log('User ID:', userId);

//         // Fetch user
//         const user = await User.findById(userId);
//         if (!user) {
//             console.error('User not found');
//             return res.status(404).json({ message: 'User not found' });
//         }

//         if (user.role !== 'member') {
//             console.error('User is not a member');
//             return res.status(403).json({ message: 'Only members can register for events' });
//         }

//         // Find the event
//         const event = await Event.findById(eventId);
//         if (!event) {
//             console.error('Event not found');
//             return res.status(404).json({ message: 'Event not found' });
//         }

//         // Check if the user has already registered for the event
//         const existingRegistration = await Registration.findOne({ event: eventId, user: userId });
//         if (existingRegistration) {
//             console.error('User already registered for this event');
//             return res.status(400).json({ message: 'You have already registered for this event' });
//         }

//         // Increment registration count (if applicable)
//         if (event.registrationCount !== undefined) {
//             event.registrationCount += 1;
//             await event.save();
//         }

//         // Create a new registration
//         const newRegistration = new Registration({
//             event: eventId,
//             user: userId,
//         });
//         await newRegistration.save();

//         // Update the user's registered events
//         user.registeredEvents.push(eventId);
//         await user.save();

//         res.status(201).json({
//             message: `Registered for event "${event.title}" successfully`,
//         });

//     } catch (error) {
//         console.error('Error in registerEvent function:', error);
//         res.status(500).json({ message: 'Error registering for event', error: error.message || error });
//     }
// };

const registerEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const existingRegistration = await Registration.findOne({ event: eventId, user: userId });
        if (existingRegistration) {
            return res.status(400).json({ message: 'Already registered for this event' });
        }

        event.registrationCount += 1;
        await event.save();

        const newRegistration = new Registration({ event: eventId, user: userId });
        await newRegistration.save();

        // user.registeredEvents.push(eventId);
        // await user.save();
        await User.findByIdAndUpdate(userId, { $push: { registeredEvents: eventId } });

        console.log('User after registration:', await User.findById(userId).populate('registeredEvents'));

        res.status(201).json({ message: `Registered for event "${event.title}" successfully` });
    } catch (error) {
        console.error('Error in registerEvent function:', error);
        res.status(500).json({ message: 'Error registering for event', error: error.message || error });
    }
};



const getRegisteredEvents = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        // Find the user by ID and populate the registeredEvents field
        const user = await User.findById(userId).populate('registeredEvents');
        console.log(user.registeredEvents);
        

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send the populated registered events
        res.status(200).json(user.registeredEvents);
    } catch (error) {
        console.error('Error in getRegisteredEvents function:', error.message || error);
        res.status(500).json({ message: 'Internal server error', error: error.message || error });
    }
};


module.exports = { registerEvent, getRegisteredEvents };
