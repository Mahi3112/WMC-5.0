const Event = require('../models/EventModel');

exports.createEvent = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Only admins can create events.' });
    }

    const { title, description, date, location } = req.body;
    const posterImagePath = req.file ? req.file.path : '';

    // Validate required fields
    if (!title || !description || !date || !location) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Parse the date string into a Date object
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ error: 'Invalid date format' });
    }

    // Create new event document
    const newEvent = new Event({
      title,
      description,
      date: parsedDate,
      location,
      posterImage: posterImagePath
    });

    // Save the event to the database
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
      return res.status(403).json({ message: 'Forbidden: Only admins can edit events.' });
    }

    const { id } = req.params;
    const { title, description, date, location } = req.body;

    // Parse the date as an ISO string
    let parsedDate;
    if (date) {
      parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) {
        return res.status(400).json({ message: 'Invalid date format' });
      }
    }

    // Handle uploaded file
    const posterImagePath = req.file ? req.file.path : req.body.posterImage;

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

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.aggregate([
      {
        $lookup: {
          from: 'registrations', // Ensure this is the correct collection name
          localField: '_id',
          foreignField: 'event',
          as: 'registrations'
        }
      },
      {
        $addFields: {
          registrationCount: { $size: '$registrations' }
        }
      },
      {
        $project: {
          title: 1,
          description: 1,
          date: 1,
          location: 1,
          registrationCount: 1
        }
      }
    ]);

    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error.message); // Log error message
    console.error('Error details:', error); // Log full error object
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    if (!req.user || !req.user.role) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const eventId = req.params.id;
    console.log('Event ID to delete:', eventId); // Log the event ID

    const result = await Event.findByIdAndDelete(eventId);

    if (!result) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
