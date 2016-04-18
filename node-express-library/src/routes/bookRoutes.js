var express = require('express');
var bookRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

// Create router function and take passed in nav to use for links
var router = function(nav) {
    
    // Secure book route unless logged in
    bookRouter.use(function(req, res, next) {
        if (!req.user) {
            res.redirect('/');
        }
        next();
    });
    bookRouter.route('/')
        .get(function(req, res) {
          var url = 'mongodb://localhost:27017/libraryApp';
          mongodb.connect(url, function(err, db) {
            var collection = db.collection('books');
            collection.find({}).toArray(
              function(err, results) {
                res.render('bookListView', {
                    title: 'Books',
                    nav: nav,
                    books: results
                });
              }
            );
          });
        });

    bookRouter.route('/:id')
        .get(function(req, res) {
          var id = new ObjectId(req.params.id);
          var url = 'mongodb://localhost:27017/libraryApp';
          mongodb.connect(url, function(err, db) {
            var collection = db.collection('books');
            collection.findOne({_id: id}, function(err, result) {
              res.render('bookView', {
                    title: 'Books',
                    nav: nav,
                    book: result
                });
            });
          });
    });

    return bookRouter;
};

module.exports = router;
