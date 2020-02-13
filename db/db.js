const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const { mongoUrl, dbName } = require('./dbVar')
const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const state = {
  [dbName]: null
};
const connect = cb => {
  client.connect(err => {
    if (err) {
      cb(err);
    } else {
      state[dbName] = client.db(dbName);
      cb();
    }
  });
};

const getObjectID = id => {
  return new mongodb.ObjectID(id);
};
module.exports = { connect, state, getObjectID };
