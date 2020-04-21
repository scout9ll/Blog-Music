<template>
  <div id="app" :style="appStyle">
     <canvas id="sound-line"></canvas>
    <music msg="Welcome to Steve911's player" v-on:postImg="changeImage" />
  </div>
</template>

<script>
import music from "./components/music.vue";
import RainDay from "./visualPlayer/rainDay";
const rainDay = {};
export default {
  name: "app",
  data() {
    return {
      imgUrl: "",
      appStyle: {}
    };
  },
  components: {
    music
  },
  methods: {
    changeImage(imgUrl, imgName) {
      // console.log(imgName);
      const defaultImg = "https://w.wallhaven.cc/full/0j/wallhaven-0jk2gw.jpg";
      imgUrl = imgUrl || defaultImg;
      this.imgUrl = imgUrl;
      this.appStyle = {
        background: `url(${imgUrl}) center no-repeat`
      };
      setTimeout(() => {
        if (imgName == "Rain") {
          rainDay.instance = new RainDay({ image: "app" });
        } else {
          if (rainDay.instance && rainDay.instance.canvas) {
            rainDay.instance.destroy();
          }
        }
      });
    }
  }
};
</script>

<style>
@font-face {
  font-family: "Neucha";
  font-style: normal;
  font-weight: 400;
  src: local("Neucha"),
    url(https://fonts.gstatic.com/s/neucha/v10/q5uGsou0JOdh94bfuQltOxU.woff2)
      format("woff2");
  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* latin */
@font-face {
  font-family: "Neucha";
  font-style: normal;
  font-weight: 400;
  src: local("Neucha"),
    url(https://fonts.gstatic.com/s/neucha/v10/q5uGsou0JOdh94bfvQlt.woff2)
      format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
    U+FEFF, U+FFFD;
}
html {
  font-family: "Neucha", -apple-system, "Segoe UI", Roboto, Oxygen, Ubuntu,
    Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", Helvetica, Arial,
    sans-serif;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}
body {
  margin: 0;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
}
#sound-line{
  position: absolute;
  left: 0;
  right: 0;
}
/* img {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: -9999;
} */
</style>
