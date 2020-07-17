<template>
  <div class="player">
    <button @click="handlePress(song)" :class="['btn-play',playState?'btn-play-active':'']"></button>
    <button
      :class="['btn-list',showList?'btn-list-active':'']"
      @click="()=>toggleListVisible()"
    >MyList</button>
    <transition-group
      class="action-state"
      name="action-state"
      tag="div"
      style="font-size:.8rem"
      mode="out-in"
    >
      <canvas v-show="songLoading" id="song-load" key="songLoading"></canvas>
      <div class="loading" v-if="loading" key="loading" style="color:green">loading...</div>
    </transition-group>

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
    <div :class="['guide-line',pressed?'hidden-guide':'']" ref="guideLine">
      <span class="guide-text">press it !!</span>
      <img src="../../assets/icon-arrow-down.svg" alt class="icon" />
    </div>
  </div>
</template>


<script>
import { mapState, mapActions } from "vuex";
import soundPublisher from "@helper/visualPlayer/soundsPublisher.js";
import { getRandomOtherIndex } from "@helper/utils";
import {
  MusicPlayer,
  SoundLine
} from "@helper/visualPlayer/soundsObservers.js";
import { detectmob } from "@helper/adapter.js";
export default {
  name: "HandDrawPlayer",
  data() {
    return {
      currentTime: "0:00",
      duration: "",
      timePercent: "",
      songLoading:false
    };
  },
  props: {
    song: Object,
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
      this.$store.commit(
        "SET_SOUNDPUBLISHER",
        new soundPublisher(this.$refs.audio, 64)
      );
      this.soundPublisher.subscribe([
        new MusicPlayer(document.getElementById("canvas"))
        // ,new SoundLine(document.getElementById("sound-line"))
      ]);
    }
  },
  computed: {
    ...mapState([
      "playState",
      "soundPublisher",
      "pressed",
      "showList",
      "songList"
    ])
  },
  methods: {
    ...mapActions(["handlePress", "playSong", "getSongList"]),
    onPlay() {
      const currentTime = parseInt(this.$refs.audio.currentTime);
      const duration = parseInt(this.$refs.audio.duration);
      this.timePercent = parseInt((100 * currentTime) / duration);
      this.currentTime = `${Math.floor(currentTime / 60)}:${
        currentTime % 60 > 9 ? currentTime % 60 : "0" + (currentTime % 60)
      }`;
    },
    loadInfo() {
      this.songLoading = false;
      const duration = parseInt(this.$refs.audio.duration);
      this.duration = `${Math.floor(duration / 60)}:${
        duration % 60 > 9 ? duration % 60 : "0" + (duration % 60)
      }`;
      this.pressed ? this.playSong() : "";
    },
    autoChange() {
      const currentIndex = this.songList.findIndex(
        song => song.name == this.currentSong.name
      );
      const nextRandomIndex = getRandomOtherIndex(
        currentIndex,
        this.songList.length
      );
      this.$store.commit("SET_CURRENT_SONG", this.songList[nextRandomIndex]);
    },
    toggleListVisible() {
      this.$store.commit("SET_SHOW_LIST", !this.$store.state.showList);
    },
    async getSong() {
      this.loading = true;
      try {
        await this.getSongList();
      } catch (e) {
        // this.shakePlayer();
        this.$toast({ text: "获取歌曲失败", mode: "danger" });
        this.loading = false;
      }
    }
  },
  watch: {
    currentSong() {
      this.songLoading = true;
    }
  }
};
</script>

<style lang='scss' scoped>
.action-state {
  position: absolute;
  width: 120px;
  height: 50px;
  left: 180px;
  bottom: 220px;
  canvas {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
}
.action-state-enter,
.action-state-leave-to {
  opacity: 0;
  transform: translateX(30px);
  position: absolute;
}
.action-state-enter-active,
.action-state-leave-active {
  position: absolute;
  transition: all 1s;
}
.action-state-move {
  transition: all 1s;
}
.btn-list {
  position: absolute;
  /* top: calc(50% - 70px);
  left: calc(50% - 119px);
  z-index: 100; */
  left: 75px;
  bottom: 300px;
  height: 20px;
  width: 52px;
  &.btn-list-active {
    transform: translate(0px, 10px);
    background-color: black;
  }
}
button:active {
  background-color: #fff;
  color: coral;
}

input[type="text"] {
  border: 0;
  border-bottom: 1px solid #000;
}
input[type="text"]:focus {
  border-bottom: 2px solid sandybrown;
  outline: 0;
}
.loading {
  animation: loading 2s steps(3, start) infinite;
  overflow: hidden;
}
@keyframes loading {
  from {
    width: 116px;
  }
  to {
    width: 75px;
  }
}
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
  filter: blur(10px);
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
  .soundPublisher {
    overflow: hidden;
  }
}
</style>
