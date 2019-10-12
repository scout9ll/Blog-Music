const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

//middleware
app.use(bodyParser.json()); //中间件,传输时自动转为json字符串,服务器接受时自动解析为对象
app.use(cors());

const music = require("./api/music");
app.use("/project/music/api/music", music);

//handle production
app.use(express.static(__dirname + "/public/"));

//handle SPA
app.get("/project/music", (req, res) =>
  res.sendFile(__dirname + "/public/project/music/index.html")
);
// if (process.env.NODE_ENV === "production") {
//   //Static folder
//   app.use(express.static(__dirname + "/public/"));

//   //handle SPA
//   app.get(/.*/, (req, res) =>
//     res.sendFile(__dirname + "/public/frontend/index.html")
//   );
// }
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("this port at ", port));
