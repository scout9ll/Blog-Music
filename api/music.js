const { state, connect, getObjectID } = require("../db/db");
const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const router = express.Router();
const auth = require("./middleware/auth");
// mongodb connect
connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("database connected");
  }
});

//get music
router.get("/", (req, res) => {
  state.musicDB
    .collection("music")
    .find({})
    .toArray()
    .then((result) => res.send(result));
});

//upload music
const storage = multer.diskStorage({
  destination: path.resolve(__dirname, "../public/musics/"),
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: storage,
}).single("musicFile");

router.post("/upload", auth, async (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.send(err);
    } else {
      state.musicDB
        .collection("music")
        .insertOne({
          name: req.file.originalname.split(".")[0],
          songUrl: "musics/" + req.file.originalname,
          songImage: req.body.songImage,
        })
        .then(() => {
          console.log(req.file.path.split("public\\"));
          res.status(201).send("thank you for your song");
        })
        .catch((err) => res.send(err));
    }
  });
});
// del music
router.delete("/:id", auth, async (req, res) => {
  state.musicDB
    .collection("music")
    .deleteOne({
      _id: getObjectID(req.params.id),
    })
    .then((result) => res.status(200).send(result));
});

// edit music
router.patch("/", auth, async (req, res) => {
  console.log(req.body);
  state.musicDB
    .collection("music")
    .updateOne(
      { _id: getObjectID(req.body._id) },
      { $set: { name: req.body.name, songImage: req.body.songImage } }
    )
    .then((result) => res.status(201).send(result));
});
module.exports = router;
