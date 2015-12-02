var express = require('express');
var app = express();
var port    = process.env.PORT || 8000;
var middleWare = require('./middleWare');

app.use(middleWare.logger);

app.get('/about', middleWare.requireAuth, function(req, res) {
    res.send('About Us');
});

app.use(express.static(__dirname + '/public'));

app.listen(port, function() {
    console.log('Magic happens on port ' + port);
});
