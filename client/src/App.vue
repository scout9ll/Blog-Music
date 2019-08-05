<template>
  <div id="app">
    <img alt="Vue logo" :src="imgUrl" />
    <music msg="Welcome to Your Vue.js App" v-on:postImg="changeImage" />
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
  left: 0;
  top: 0;
  right: 0;
  z-index: -9999;
}
</style>
