const Event = require('../models/EventModel');

exports.createEvent = async (req, res) => {
    try {
        console.log('Request User:', req.user);  // Log req.user to check the role
        console.log('Role',req.user.role);
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden: Only admins can create events.' });
        }

        const { title, description, date, location } = req.body;
        
        console.log('Received Data:', { title, description, date, location });  // Log received data

        // Convert date format
        const [day, month, year] = date.split('-');
        const parsedDate = new Date(`${year}-${month}-${day}`);

        // Handle uploaded file
        const posterImagePath = req.file ? req.file.path : '';
        console.log('Poster Image Path:', posterImagePath);  // Log poster image path

        const newEvent = new Event({
            title,
            description,
            date: parsedDate,
            location,
            // posterImage: posterImagePath
        });

        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.editEvent = async (req, res) => {

    try {
        
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden: Only admins can create events.' });
        }

        const { id } = req.params;
        const { title, description, date, location } = req.body;

        // Convert date format if provided
        let parsedDate;
        if (date) {
            const [day, month, year] = date.split('-');
            parsedDate = new Date(`${year}-${month}-${day}`);
            if (isNaN(parsedDate.getTime())) {
                return res.status(400).json({ message: 'Invalid date format' });
            }
        }

        // Handle uploaded file
        const posterImagePath = req.file ? req.file.path : '';

        // Update event in the database
        const updatedEvent = await Event.findByIdAndUpdate(id, {
            title,
            description,
            date: parsedDate,
            location,
            posterImage: posterImagePath
        }, { new: true });

        // Check if event was found and updated
        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Send the updated event as the response
        res.status(200).json(updatedEvent);
    } catch (error) {
        console.error('Error editing event:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};


// Get All Events
exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete Event
exports.deleteEvent = async (req, res) => {
    try {
        // if (req.user.role !== 'admin') {
        //     return res.status(403).json({ message: 'Forbidden: Only admins can delete events.' });
        // }

        const { id } = req.params;
        const deletedEvent = await Event.findByIdAndDelete(id);

        if (!deletedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
