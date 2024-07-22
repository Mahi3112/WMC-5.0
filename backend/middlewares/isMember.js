// middlewares/isMember.js
const User = require('../models/UserModel');

// const isMember = async (req, res, next) => {
//     try {
//         // Assuming `req.user.id` is set by authentication middleware
//         const userId = req.user.id; 
//         const user = await User.findById(userId);

//         if (user && user.role === 'member') {
//             next(); // Proceed to the next middleware or route handler
//         } else {
//             res.status(403).json({ message: 'Access denied' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Internal server error', error });
//     }
// };


// const isMember = (req, res, next) => {
//     console.log('User in middleware:', req.user);
//     if (!req.user || req.user.role !== 'member') {
//         return res.status(403).json({ message: 'Access denied' });
//     }
//     next();
// };


const isMember = (req, res, next) => {
    // For debugging: log the whole request to see if user info is available
    console.log('Request User:', req.user);
    
    // Ensure req.user is properly set and has the role 'member'
    if (req.user && req.user.role === 'member') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied' });
    }
};

module.exports = { isMember };
