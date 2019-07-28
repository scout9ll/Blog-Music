<template>
  <div class="music">
    <div class="add" ref="addDom">
      <input type="text" id="music-name" v-model="musicName" />
      <input type="text" id="music-url" v-model="musicUrl" />
      <button v-on:click="addSong({name:musicName,songUrl:musicUrl})">add</button>
      <!-- ({name:musicName,songUrl:musicUrl}) -->
      <button v-on:click="getSong">get</button>
    </div>
    {{songList}}
    <div class="player">
      <div class="loading" v-if="loading">💗</div>
      <!-- <div class="song" v-bind:key="song.songUrl" v-for="song in songList">
        {{song.name}}
        <audio v-bind:src="song.songUrl" controls="controls" v-bind:ref="song.name"></audio>
        <button @click="delSong(song._id)" v-bind:disabled="loading">删除</button>
        <button @click="playSong($refs[song.name])"></button>
      </div>-->
      <audio v-bind:src="currentSong.songUrl" controls="controls" v-bind:ref="currentSong.name"></audio>
      <button @click="playSong($refs[currentSong.name])">播放</button>
      <audio src="../assets/雨宮天 - 奏 (かなで).mp3" controls="controls"></audio>
      <button
        class="next"
        @click="()=>{const songIndex=songList.indexOf(currentSong)+1;currentSong=songList[songIndex]}"
      >NEXT</button>
    </div>
  </div>
</template>
<script>
import MusicService from "../musicService";
export default {
  name: "music",
  data() {
    return {
      songList: [],
      currentSong: {},
      musicName: "",
      musicUrl: "",
      loading: false
    };
  },
  methods: {
    playSong: function(dom) {
      console.log(dom);
      dom.play();
    },
    getSong: function() {
      this.loading = true;
      return MusicService.getMusic().then(res => {
        this.songList = res;
        this.loading = false;
        this.currentSong = this.songList[0];
      });
    },
    addSong: function(data) {
      this.loading = true;
      return MusicService.addMusic(data).then(() => this.getSong());
    },
    delSong: function(id) {
      this.loading = true;
      return MusicService.delMusic(id).then(() => this.getSong());
    }
  }
};
</script>

<style scoped>
.loading {
  animation: loading 5s cubic-bezier(0.18, 0.89, 0.32, 1.28) infinite;
}
@keyframes loading {
  from {
    transform: scale(0.1);
  }
  to {
    transform: scale(3);
  }
}
</style>
