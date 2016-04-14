var express = require('express');
var bookRouter = express.Router();

// Create router function and take passed in nav to use for links
var router = function(nav) {
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
        }
    ];

    bookRouter.route('/')
        .get(function(req, res) {
        res.render('bookListView', {
            title: 'Books',
            nav: nav,
            books: books
        });
    });

    bookRouter.route('/:id')
        .get(function(req, res) {
        var id = req.params.id;
        res.render('bookView', {
            title: 'Books',
            nav: nav,
            book: books[id]
        });
    });

    return bookRouter;
};

module.exports = router;