<template>
  <div class="music">
    <div class="add">
      <input type="text" id="music-name" v-model="musicName" />
      <input type="text" id="music-url" v-model="musicUrl" />
      <button v-on:click="addSong({name:musicName,songUrl:musicUrl})">add</button>
      <!-- ({name:musicName,songUrl:musicUrl}) -->
      <button v-on:click="getSong">get</button>
    </div>
    {{songList}}
    <div class="player">
      <div class="loading" v-if="loading">💗</div>
      <div class="song" v-bind:key="song.songUrl" v-for="song in songList">
        {{song.name}}
        <audio v-bind:src="song.songUrl" controls="controls"></audio>
        <button @click="delSong(song._id)" v-bind:disabled="loading">删除</button>
      </div>
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
      musicName: "",
      musicUrl: "",
      loading: false
    };
  },
  methods: {
    getSong: function() {
      this.loading = true;
      return MusicService.getMusic().then(res => {
        this.songList = res;
        this.loading = false;
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
