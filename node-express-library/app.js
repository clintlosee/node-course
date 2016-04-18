/*jslint node: true */
'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
var port = process.env.PORT || 5000;

// Set nav to pass to routes
var nav = [{
    Link: '/Books',
    Text: 'Books'
}, {
    Link: '/Authors',
    Text: 'Authors'
}];

// Create routes and pass nav into route functions
var bookRoute = require('./src/routes/bookRoutes')(nav);
var adminRoute = require('./src/routes/adminRoutes')(nav);
var authRoute = require('./src/routes/authRoutes')(nav);

// Middleware
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(session({secret: 'library', resave: true, saveUninitialized: true}));
require('./src/config/passport')(app);

// Set view engine and directory to serve files from
app.set('views', './src/views');
app.set('view engine', 'ejs'); // Sets EJS as view engine
//app.set('view engine', 'jade'); // Sets Jade as view engine

// Main page route
app.get('/', function (req, res) {
    res.render('index', {
        title: 'Hello from render',
        nav: nav
    });
});

// Routes
app.use('/Books', bookRoute);
app.use('/Admin', adminRoute);
app.use('/Auth', authRoute);

// Start server
app.listen(port, function (err) {
    console.log('Listening on port: ' + port);
});
