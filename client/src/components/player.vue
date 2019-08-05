<template>
  <div class="player">
    <button @click="startPlay" :class="['btn-play',resume?'btn-play-active':'']"></button>
    <slot name="listButton"></slot>
    <audio
      :src="song.songUrl"
      ref="audio"
      @timeupdate="onPlay"
      @canplay="loadInfo"
      @ended="autoChange"
    ></audio>
    <canvas id="canvas"></canvas>

    <div class="songInfo">
      <div class="songName">{{song.name}}</div>
      <div class="time">{{currentTime}}/{{duration}}</div>
    </div>
  </div>
</template>


<script>
import player from "../player.js";
export default {
  name: "HandDrawPlayer",

  data() {
    return {
      currentTime: "",
      duration: "",
      resume: false
    };
  },
  props: {
    song: Object
  },
  methods: {
    onPlay() {
      this.currentTime = parseInt(this.$refs.audio.currentTime);
    },
    loadInfo() {
      this.duration = parseInt(this.$refs.audio.duration);
      this.resume ? this.$refs.audio.play() : "";
    },
    startPlay() {
      if (this.resume) {
        this.$refs.audio.pause();
        cancelAnimationFrame(player.getFrameID());
        this.resume = false;
      } else {
        player
          .getAudioCtx()
          .resume()
          .then(() => {
            this.$refs.audio.play();
            player.rockMusic();
            this.resume = true;
          });
      }
    },
    autoChange() {
      console.log("over");
      this.$emit("song-ended");
    }
  },
  mounted() {
    player.initAudio();
  }
};
</script>

<style scoped>
.player {
  position: relative;
}
.btn-play {
  position: absolute;

  left: 333px;
  bottom: 300px;
  height: 20px;
  width: 24px;
}
audio {
  display: none;
}
.songInfo {
  position: absolute;
  left: 250px;
  bottom: 120px;
  width: 130px;
  overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
  text-overflow: ellipsis; /*溢出时显示省略标记...；需与overflow:hidden;一起使用*/
}
.songName {
  font-size: 0.7rem;
}
.time {
  font-size: 0.8rem;
}
.btn-play-active {
  height: 13px;
  background-color: rgb(17, 207, 59);
}
</style>
