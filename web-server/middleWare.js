var middleWare = {
    requireAuth: function(req, res, next) {
        console.log('Private route hit!');
        next();
    },
    logger: function(req, res, next) {
        console.log('Request: ' + req.method + ' ' + req.originalUrl);
        next();
    }
}
module.exports = middleWare;
