const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

//middleware
app.use(bodyParser.json()); //中间件,传输时自动转为json字符串,服务器接受时自动解析为对象
app.use(cors());

const music = require("./routes/api/music");
app.use("/api/music", music);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("this port at ", port));
