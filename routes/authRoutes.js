const passport = require('passport');

module.exports = function (app) {
    app.get('/auth/google', 
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
    )
    
    app.get('/auth/google/callback', passport.authenticate('google', {
        successRedirect: '/api/current_user',
        failureRedirect: '/api/fail'
    }))

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user);
    })

    app.get('/api/fail', (req, res) => {
        res.send('Authentication Failed!');
    })

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    })
}