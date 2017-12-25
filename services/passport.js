const passport = require('passport');
const keys = require('../config/keys');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = mongoose.model('users');

passport.serializeUser(function (user, done) {
    done(null, user.id);
})

passport.deserializeUser(function (id, done) {
    User.findById(id)
        .then(function (user) {
            done(null, user);
        })
})

passport.use(new GoogleStrategy(
    {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
    },
    function (accessToken, refreshToken, profile, done) {
        User.findOne({ googleId: profile.id })
            .then(function (existingUser) {
                if (existingUser) {
                    // We have alreadyield
                    done(null, existingUser);
                } else {
                    new User({googleId: profile.id})
                        .save()
                        .then(function (user) {
                            done(null, user);
                        })
                }
            })
    }
)
);