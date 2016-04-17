var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var books = [
    {
        title: 'War and Peace',
        genre: 'Historical Fiction',
        author: 'Lev Nikolayevich Tolstoy',
        read: false
    },
    {
        title: 'Les Miserables',
        genre: 'Historical Fiction',
        author: 'Victor Hugo',
        read: false
    },
    {
        title: 'A Journey to the Center of the Earth',
        genre: 'Science Fiction',
        author: 'Jules Verne',
        read: false
    },
    {
        title: 'The Dark World',
        genre: 'Fantasy',
        author: 'Henry Kuttner',
        read: false
    },
    {
        title: 'Harry Potter',
        genre: 'Fantasy',
        author: 'JK Rowling',
        read: false
    }
];

var router = function(nav) {
    adminRouter.route('/addBooks')
        .get(function(req, res) {
          var url = 'mongodb://localhost:27017/libraryApp';
          mongodb.connect(url, function(err, db) {
            var collection = db.collection('books');
            collection.insertMany(books, function(err, results) {
              res.send(results);
              db.close();
            });
          });
        });

    return adminRouter;
};

module.exports = router;
