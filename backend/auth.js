const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User= require("./models/UserModel");


passport.use(new LocalStrategy(
    function(username, password, done) {
        
      User.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.verifyPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));

//   // middlewares/auth.js
//   exports.isAdmin = (req, res, next) => {
//     if (req.user && req.user.role === 'admin') {
//         next();
//     } else {
//         res.status(403).json({ message: 'Forbidden: Admins only' });
//     }
// };

  
  module.exports = passport;
