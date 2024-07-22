const express = require('express');
const router = express.Router();
const memberStoryController = require('../controllers/StoryController');

// Public routes
router.get('/stories', memberStoryController.getAllStories); // Get all stories
router.post('/stories', memberStoryController.createStory); // Create a new story (this might be restricted in a real-world app)
router.get('/stories/:id', memberStoryController.getStoryById); // Get a story by ID
router.put('/stories/:id', memberStoryController.updateStory); // Update a story by ID (this might be restricted in a real-world app)
router.delete('/stories/:id', memberStoryController.deleteStory); // Delete a story by ID (this might be restricted in a real-world app)

module.exports = router;
