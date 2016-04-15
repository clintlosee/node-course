/*jslint node: true */
'use strict';

var express = require('express');
var app = express();
var port = process.env.PORT || 5000;

// Set nav to pass to routes
var nav = [{
    Link: '/Books',
    Text: 'Books'
}, {
    Link: '/Authors',
    Text: 'Authors'
}];

// Create routes and pass nav into route function
var bookRoute = require('./src/routes/bookRoutes')(nav);
var adminRoute = require('./src/routes/adminRoutes')(nav);

// Set view engine and directory to serve files from
app.use(express.static('public'));
app.set('views', './src/views');
//app.set('view engine', 'jade'); // Sets Jade as view engine
app.set('view engine', 'ejs'); // Sets EJS as view engine

// Main page route
app.get('/', function (req, res) {
    res.render('index', {
        title: 'Hello from render',
        nav: nav
    });
});

// Books route
app.use('/Books', bookRoute);
app.use('/Admin', adminRoute);

// Start server
app.listen(port, function (err) {
    console.log('Listening on port: ' + port);
});