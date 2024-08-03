const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RegistrationSchema = new Schema({
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
   
    registrationDate: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Registration = mongoose.model('Registration', RegistrationSchema);

module.exports = Registration;
