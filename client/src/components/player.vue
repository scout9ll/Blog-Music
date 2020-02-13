<template>
  <div class="player">
    <button @click="startPlay" :class="['btn-play',resume?'btn-play-active':'']"></button>
    <slot name="listButton"></slot>
    <slot name="state"></slot>

    <audio
      :src="(song.songUrl.includes('base64')?'':'/')+song.songUrl"
      ref="audio"
      @timeupdate="onPlay"
      @canplay="loadInfo"
      @ended="autoChange"
    ></audio>
    <canvas id="canvas"></canvas>
    <canvas id="canvas-shadow"></canvas>
    <div class="songInfo">
      <div class="songName">{{song.name}}</div>
      <div
        class="time"
        :style="{background: `linear-gradient(90deg, #619c71, transparent ${timePercent*1.5}%) `}"
      >{{currentTime}}/{{duration}}</div>
    </div>
    <div class="guide-line" ref="guideLine">
      <span class="guide-text">press it !!</span>
      <img src="../assets/icon-arrow-down.svg" alt class="icon" />
    </div>
  </div>
</template>


<script>
import player from "../visualPlayer/player.js";
import { detectmob } from "../utils/adapter.js";
export default {
  name: "HandDrawPlayer",

  data() {
    return {
      currentTime: "0:00",
      duration: "",
      timePercent: ""
    };
  },
  props: {
    song: Object,
    resume: Boolean,
    songLoading: Boolean
  },
  methods: {
    onPlay() {
      const currentTime = parseInt(this.$refs.audio.currentTime);
      const duration = parseInt(this.$refs.audio.duration);
      this.timePercent = parseInt((100 * currentTime) / duration);
      this.currentTime = `${Math.floor(currentTime / 60)}:${
        currentTime % 60 > 9 ? currentTime % 60 : "0" + (currentTime % 60)
      }`;
    },
    loadInfo() {
      this.$emit("update:songLoading", false);
      const duration = parseInt(this.$refs.audio.duration);
      this.duration = `${Math.floor(duration / 60)}:${
        duration % 60 > 9 ? duration % 60 : "0" + (duration % 60)
      }`;
      this.resume
        ? this.$refs.audio.play()
        : this.$refs.guideLine.classList.contains("hidden-guide")
        ? this.startPlay()
        : "";
    },
    startPlay() {
      this.$refs.guideLine.classList.add("hidden-guide");
      if (this.resume) {
        this.$refs.audio.pause();
        cancelAnimationFrame(player.getFrameID());
        this.$emit("update:resume", false);
      } else {
        player
          .getAudioCtx()
          .resume()
          .then(() => {
            this.$refs.audio.play();
            player.rockMusic();
            this.$emit("update:resume", true);
          });
      }
    },
    autoChange() {
      this.$emit("song-ended");
    }
  },
  mounted() {
    if (detectmob()) {
      this.$toast({
        text: "很遗憾,手机端无法使用audioAPI哦,马上为您跳转到主页",
        mode: "danger",
        duration: 3000
      });
      setTimeout(() => {
        window.location.href = "/";
      }, 1600);
    } else {
      player.initAudio();
    }
  }
};
</script>

<style scoped>
.player {
  position: relative;
}
.btn-play {
  position: absolute;

  left: 250px;
  bottom: 300px;
  height: 20px;
  width: 24px;
}
audio {
  display: none;
}
.songInfo {
  position: absolute;
  left: 175px;
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
  border-bottom-right-radius: 76px 255px;
  border-bottom-left-radius: 168px 15px;
  border-top-right-radius: 266px 15px;
  border-top-left-radius: 33px 225px;

  border: 1px solid;
  overflow: hidden;
}
.btn-play-active {
  height: 13px;
  background-color: rgb(17, 207, 59);
}
#canvas-shadow {
  position: absolute;
  left: 0;
  transform-origin: 50px 420px;
  transform: scaleY(0.45) skewX(-35deg);
  flood-opacity: 0%;
  opacity: 0.3;
}
.guide-line {
  width: 80px;
  position: absolute;
  left: 222.5px;
  bottom: 330px;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: guideLine 2s ease-in-out infinite;
  opacity: 1;
  transition: opacity 2s ease;
}
.guide-line .icon {
  height: 40px;
}
.guide-text {
  color: black;
  font-style: oblique;
}
.hidden-guide {
  opacity: 0;
}
@keyframes guideLine {
  100%,
  0% {
    bottom: 350px;
  }
  50% {
    bottom: 320px;
  }
}
@media screen and (max-width: 750px) {
  .player {
    overflow: hidden;
  }
}
</style>
