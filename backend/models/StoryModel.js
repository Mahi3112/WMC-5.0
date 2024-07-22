const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberStorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    story: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('MemberStory', memberStorySchema);
