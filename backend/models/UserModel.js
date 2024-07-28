const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Import Schema
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure email is unique
        match: [/.+@.+\..+/, 'Please enter a valid email address'] // Simple email validation
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['member', 'admin'],
        default: 'member'
    },
    virtualCurrency: {
        type: Number,
        default: 10000000
    },
    membershipStatus: {
        type: String,
       
        required: false 
    },
    memberStory: {
        type: Schema.Types.ObjectId,
        ref: 'MemberStory',
        required: false // Adjust based on requirements
    },
    registeredEvents: [{
        type: Schema.Types.ObjectId,
        ref: 'Event'
    }]
}, { timestamps: true });

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

userSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
