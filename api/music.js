const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
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

//upload music
const storage = multer.diskStorage({
  destination: path.resolve(__dirname, "../public/musics/"),
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({
  storage: storage
}).single("musicFile");

router.post("/upload", (req, res) => {
  upload(req, res, err => {
    if (err) {
      res.send(err);
    } else {
      client.connect(err => {
        const collection = client.db("test1").collection("music");
        collection
          .insertOne({
            name: req.file.originalname.split(".")[0],
            songUrl: req.file.path.split("public\\")[1],
            songImage: req.body.songImage
          })
          .then(() => {
            res.status(201).send("thank you for your song");
          })
          .catch(err => res.send(err));
      });
    }
  });
});
// del music
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
