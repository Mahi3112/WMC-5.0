const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const eventController = require('../controllers/EventController');
const { jwtAuthMiddleware } = require('../jwt');

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Route to create a new event with file upload
router.post('/postevent', jwtAuthMiddleware, upload.single('posterImage'), eventController.createEvent);

// Route to get all events
router.get('/getevent', eventController.getAllEvents);

// Route to delete an event by ID
router.delete('/deleteevent/:id', jwtAuthMiddleware, eventController.deleteEvent);

// Route to edit an event by ID with optional file upload
router.put('/editevent/:id', jwtAuthMiddleware, upload.single('posterImage'), eventController.editEvent);

module.exports = router;
