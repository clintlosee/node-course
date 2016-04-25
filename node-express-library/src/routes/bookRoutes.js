var express = require('express');
var bookRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

// Create router function and take passed in nav to use for links
var router = function(nav) {
    var bookService = require('../services/goodreadsService')();
    var bookController = require('../controllers/bookController')(bookService, nav);

    // Secure book route unless logged in
    bookRouter.use(bookController.middleWare);
    bookRouter.route('/')
        .get(bookController.getIndex);

    bookRouter.route('/:id')
        .get(bookController.getById);

    return bookRouter;
};

module.exports = router;
