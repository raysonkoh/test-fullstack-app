const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    (email, password, done) => {
      User.findOne({email: email}).then(user => {
        if (!user) {
          return done(null, false);
        }

        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) return done(err);

          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    },
  ),
);

passport.serializeUser((user, done) => {
  console.log('serializing user...');
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log('deserializing user...');
  User.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(err => done(err));
});

module.exports = passport;
