const MemberStory = require('../models/StoryModel');

exports.getAllStories = async (req, res) => {
    try {
        const stories = await MemberStory.find();
        res.status(200).json(stories);
    } catch (error) {
        console.error('Error fetching member stories:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.createStory = async (req, res) => {
    try {
        const { name, story } = req.body;

        const newStory = new MemberStory({
            name,
            story
        });

        const savedStory = await newStory.save();
        res.status(201).json(savedStory);
    } catch (error) {
        console.error('Error creating member story:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getStoryById = async (req, res) => {
    try {
        const story = await MemberStory.findById(req.params.id);
        if (!story) {
            return res.status(404).json({ message: 'Story not found' });
        }
        res.status(200).json(story);
    } catch (error) {
        console.error('Error fetching member story:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.updateStory = async (req, res) => {
    try {
        const { name, story } = req.body;

        const updatedStory = await MemberStory.findByIdAndUpdate(req.params.id, {
            name,
            story
        }, { new: true });

        if (!updatedStory) {
            return res.status(404).json({ message: 'Story not found' });
        }

        res.status(200).json(updatedStory);
    } catch (error) {
        console.error('Error updating member story:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.deleteStory = async (req, res) => {
    try {
        const deletedStory = await MemberStory.findByIdAndDelete(req.params.id);
        if (!deletedStory) {
            return res.status(404).json({ message: 'Story not found' });
        }
        res.status(200).json({ message: 'Story deleted successfully' });
    } catch (error) {
        console.error('Error deleting member story:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
