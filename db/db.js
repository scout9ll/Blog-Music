const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const { mongoUrl, musicDB } = require('./dbVar')
const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const state = {

};
const connect = cb => {
  client.connect(err => {
    if (err) {
      cb(err);
    } else {
      state.musicDB = client.db(musicDB);
      cb();
    }
  });
};

const getObjectID = id => {
  return new mongodb.ObjectID(id);
};
module.exports = { connect, state, getObjectID };
