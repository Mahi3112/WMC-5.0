// models/Membership.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const membershipSchema = new Schema({
    name: {
        type: String,
        required: true,
        enum: ['basic', 'standard', 'premium'] // Adjust as needed
    },
    price: {
        type: Number,
        required: true
    },
    benefits: {
        type: [String], // List of benefits
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Membership', membershipSchema);
