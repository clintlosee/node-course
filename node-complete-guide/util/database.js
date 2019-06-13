// # DB Name: nodecourseuser
// # DB Pass: nodeUserPass2
// # mongodb://nodecourseuser:nodeUserPass2@ds155616.mlab.com:55616/nodecourse1

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
  MongoClient.connect(
    'mongodb://nodecourseuser:nodeUserPass2@ds155616.mlab.com:55616/nodecourse1'
  )
    .then(client => {
      console.log('Connected');
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
