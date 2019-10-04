const path = require("path");

module.exports = {
  outputDir: path.resolve(__dirname, "../public/frontend"),
  //resolve拼接成输出的绝对路径
  //如果在处理完所有给定的 path 片段之后还未生成绝对路径，则再加上当前工作目录。
  devServer: {
    proxy: {
      "/api": {
        target: "https://steve911-music-player.herokuapp.com"
      },
      "/music": {
        target: "https://steve911-music-player.herokuapp.com"
      }
    }
  },
  publicPath: process.env.NODE_ENV === "production" ? "/frontend/" : "/"
};
