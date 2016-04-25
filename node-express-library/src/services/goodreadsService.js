var http = require('http');
var xml2js = require('xml2js');
var parser = xml2js.Parser({explicitArray: false});

var goodreadsService = function() {
  var getBookByID = function(id, cb) {
    var options = {
      host: 'www.goodreads.com',
      path: '/book/show/' + id + '?format=xml&key=mN1DyVoFS4cfbCMh5HmnpA'
    };

    var callback = function(res) {
      var str = '';

      res.on('data', function(chunk) {
        str += chunk;
      });

      res.on('end', function() {
        parser.parseString(str, function(err, result) {
            cb(null, result.GoodreadsResponse.book);
        });
      });
    };

    http.request(options, callback).end();
  };

  return {
    getBookByID: getBookByID
  };
};

module.exports = goodreadsService;
