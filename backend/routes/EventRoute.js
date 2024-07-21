const express = require('express');
const router = express.Router();
const multer = require('multer');  
const path = require('path');
const eventController = require('../controllers/EventController');
const { jwtAuthMiddleware } =require('../jwt')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({ storage: storage });  


router.post('/postevent',jwtAuthMiddleware, upload.single('posterImage'), eventController.createEvent);


router.get('/getevent', eventController.getAllEvents);


router.delete('/deleteevent/:id', eventController.deleteEvent);


router.put('/editevent/:id',jwtAuthMiddleware,upload.single('posterImage'), eventController.editEvent);

module.exports = router;
