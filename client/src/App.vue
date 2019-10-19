<template>
  <div id="app">
    <img alt="background-image" :src="imgUrl" />
    <music msg="Welcome to Steve911's player" v-on:postImg="changeImage" />
  </div>
</template>

<script>
import music from "./components/music.vue";

export default {
  name: "app",
  data() {
    return {
      imgUrl: ""
    };
  },
  components: {
    music
  },
  methods: {
    changeImage(imgUrl) {
      const defaultImg = "https://w.wallhaven.cc/full/0j/wallhaven-0jk2gw.jpg";
      imgUrl = imgUrl || defaultImg;
      this.imgUrl = imgUrl;
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

  background: no-repeat cover center;
}
img {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  z-index: -9999;
}
</style>
