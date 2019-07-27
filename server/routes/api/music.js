const express = require("express");

const router = express.Router();
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const uri =
  "mongodb+srv://test:87955626@music-6epxh.mongodb.net/test1?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

//get music
router.get("/", (req, res) => {
  client.connect(err => {
    const collection = client.db("test1").collection("music");
    collection
      .find({})
      .toArray()
      .then(result => res.send(result));
  });
});
//add music
router.post("/", (req, res) => {
  client.connect(err => {
    const collection = client.db("test1").collection("music");
    collection
      .insertOne({
        name: req.body.name,
        songUrl: req.body.songUrl
      })
      .then(() => res.status(201).send());
  });
});
//
router.delete("/:id", (req, res) => {
  client.connect(err => {
    const collection = client.db("test1").collection("music");
    collection
      .deleteOne({
        _id: new mongodb.ObjectID(req.params.id)
      })

      .then(result => res.status(200).send(result));
  });
});

module.exports = router;

// const contentful = require("contentful-management");

// const client = contentful.createClient({
//   accessToken: "6kSsR_OogAiFBkSuYGUUspMIPOMm4cv9wv-V3Kmq4qQ"
// });

// client
//   .getSpace("tm2lzfo0dh22")
//   .then(space => space.getEntry("31TLIWNV0nrpVCwU1VsEaW"))
//   .then(entry => res.send(entry))
//   .catch(console.error);
// // res.send("hello");
