const passport = require('passport');
const keys = require('../config/keys');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = mongoose.model('users');

passport.use(new GoogleStrategy(
    {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
    },
    function (accessToken, refreshToken, profile, done) {
        new User({googleId: profile.id}).save()
    }
)
);