const passport = require('passport');

exports.login = passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: 'Failed Login!',
    successRedirect: '/',
    successFlash: 'You Are Logged In!'
});

exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'You are now logged out!');
    res.redirect('/');
};

exports.isLoggedIn = (req, res, next) => {
    // check to see if user is authenticated
    if (req.isAuthenticated()) {
        next(); // already logged in
    } else {
        req.flash('error', 'Oops you must be logged in to do that!');
        res.redirect('/login');
    }
};
