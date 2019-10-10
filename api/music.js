const myDb = require("../db/db");
const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const router = express.Router();

// login
function authCheck(req, res) {
  myDb.state.test1
    .collection("account")
    .findOne({ username: req.data.name, password: req.data.password })
    .then(result =>
      result[0]
        ? res.send({ token: "justtesttoken" })
        : res.send("sorry!this accout have no exist")
    );
}
// check token
const checkToken = async (req, res) => {
  const account = await myDb.state.test1
    .collection("account")
    .findOne({ token: req.headers.authorization });
  console.log(account);
  if (account) {
    return { ok: true, data: account };
  } else {
    return { ok: false, data: "oh,no,maybe you are not owner" };
  }
};

// mongodb connect
myDb.connect(err => {
  if (err) {
    console.log(err);
  } else {
    console.log("database connected");
  }
});
//get music
router.get("/", (req, res) => {
  myDb.state.test1
    .collection("music")
    .find({})
    .toArray()
    .then(result => res.send(result));
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

router.post("/upload", async (req, res) => {
  const status = await checkToken(req, res);
  if (status.ok) {
    upload(req, res, err => {
      if (err) {
        res.send(err);
      } else {
        myDb.state.test1
          .collection("music")
          .insertOne({
            name: req.file.originalname.split(".")[0],
            songUrl: "musics/" + req.file.originalname,
            songImage: req.body.songImage
          })
          .then(() => {
            console.log(req.file.path.split("public\\"));
            res.status(201).send("thank you for your song");
          })
          .catch(err => res.send(err));
      }
    });
  } else {
    res.status(401).send(status.data);
  }
});
// del music
router.delete("/:id", async (req, res) => {
  const status = await checkToken(req, res);
  if (status.ok) {
    myDb.state.test1
      .collection("music")
      .deleteOne({
        _id: myDb.getObjectID(req.params.id)
      })

      .then(result => res.status(200).send(result));
  } else {
    res.status(401).send(status.data);
  }
});

// edit music
router.patch("/", async (req, res) => {
  const status = await checkToken(req, res);
  if (status.ok) {
    console.log(req.body);
    myDb.state.test1
      .collection("music")
      .updateOne(
        { _id: myDb.getObjectID(req.body._id) },

        { $set: { name: req.body.name, songImage: req.body.songImage } }
      )

      .then(result => res.status(201).send(result));
  } else {
    res.status(401).send(status.data);
  }
});
module.exports = router;
