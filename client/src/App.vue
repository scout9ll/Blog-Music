<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <music msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import music from "./components/music.vue";

export default {
  name: "app",
  components: {
    music
  }
};
</script>

<style>
body{
  margin:0;
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
  background-image: url(http://jibaofiles.s3.amazonaws.com/public/f7b7f324-01a4-4890-9479-88940e201cd1/9739f3df-7951-443d-b839-0ffadef781e6.jpg);
}
</style>
