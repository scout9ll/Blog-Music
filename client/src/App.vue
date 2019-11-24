<template>
  <div id="app" :style="appStyle">
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
      console.log(imgName);
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
            console.log(rainDay.instance);
            rainDay.instance.destroy();
          }
        }
      });
    }
  }
};
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
}
/* img {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: -9999;
} */
</style>
