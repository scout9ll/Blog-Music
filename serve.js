// const MongoClient = require("mongodb").MongoClient;
// const uri =
//   "mongodb+srv://steve911:87955626@music-6epxh.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect().then(client => client.db("test").collection("device"));

const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://test:87955626@music-6epxh.mongodb.net/test1?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test1").collection("something");
  // perform actions on the collection object4

  //   new Promise((resolve, reject) => resolve(collection.find({}).toArray())).then(
  //     r => console.log(r)
  //   );
  collection
    .find({})
    .toArray()
    .then(res => console.log(res));
  client.close();
});
