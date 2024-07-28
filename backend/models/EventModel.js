// models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    registrationCount: {
        type: Number,
        default: 0
    },
    posterImage: {
        type: String, // This can be a URL or a path to the image
        required: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);
