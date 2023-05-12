// passport-setup.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/signModel');
require("dotenv").config({ path: ".env.local" });


module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({ email: email})
        .then(user => {
          if (!user) {
            return done(null, false, { message: 'That email is not registered' });
          }

          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              const payload = { id: user.id, name: user.name }; // What you want to put in the token
              const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }); // Create the token

              return done(null, { ...user._doc, password: undefined, token }); // Return the user and token

            } else {
              return done(null, false, { message: 'Password incorrect passport' });
            }
          });
        })
        .catch(err => console.log(err));
    })
  );

  // Google Strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ googleId: profile.id });

          if (user) {
            return done(null, user);
          } else {
            const newUser = new User({
              googleId: profile.id,
              displayName: profile.displayName,
              email: profile.emails[0].value,
              profileImage: profile.photos[0].value,
            });
            user = await newUser.save();
            return done(null, user);
          }
        } catch (err) {
          console.error(err);
          return done(err, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
