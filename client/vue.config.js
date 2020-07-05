const path = require("path");

module.exports = {
  configureWebpack: {
    resolve: {
      extensions: ['.ts']
    },
    module: {
      rules: [
        { test: /\.ts$/, use: 'babel-loader' }
      ]
    }
  },
  outputDir: path.resolve(__dirname, "../public/project/music"),
  //resolve拼接成输出的绝对路径
  //如果在处理完所有给定的 path 片段之后还未生成绝对路径，则再加上当前工作目录。
  devServer: {
    proxy: {
      "/api": {
        target: "http://47.97.171.84:5000/project/music/"
      },
      "/music": {
        target: "http://47.97.171.84:5000/"
      }
    }
  },
  publicPath: process.env.NODE_ENV === "production" ? "/project/music/" : "/",
  productionSourceMap:false,
};
