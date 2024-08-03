const User = require('../models/UserModel');


const isAdmin = (req, res, next) => {
    console.log('Request User:', req.user);
    
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Access denied' });
    }
  };

module.exports = { isAdmin };
