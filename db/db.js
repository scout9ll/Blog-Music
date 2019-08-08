const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const uri =
  "mongodb+srv://test:87955626@music-6epxh.mongodb.net/test1?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

const dbName = "test1";
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
