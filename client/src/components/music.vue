<template>
  <div class="music" ref="music">
    <transition-group
      class="action-state"
      name="action-state"
      tag="div"
      style="font-size:.8rem"
      mode="out-in"
    >
      <div class="loading" v-if="loading" key="loading" style="color:green">loading...</div>
      <!-- <div class="error" v-if="error.length>1" key="error" style="color:red">{{error}}</div>
      <div class="message" v-if="message.length>1" key="message">{{message}}</div>-->
    </transition-group>
    <div :class="['songList',showList?'songList-active':'']">
      <div
        v-bind:key="song.songUrl"
        v-for="song in songList"
        class="songList-item"
        :style="{background:song._id==setID?'linear-gradient(180deg, #7bc199, #27663317)':''}"
      >
        <div
          :class="[`song-item-row` ,`song-primary`,currentSong._id==song._id?'song-in-player':'']"
        >
          <span
            @click="handlePlay"
            :class="[`song-play-btn`,currentSong._id==song._id&&resume?`onplay`:'pause']"
          >
            <svg
              t="1570094903377"
              class="play-svg"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="22628"
              width="200"
              height="200"
            >
              <path
                class="pause-path"
                d="M513.024 61.44q93.184 0 175.104 35.328t142.848 96.768 96.256 143.872 35.328 175.616-35.328 175.616-96.256 143.872-142.848 96.768-175.104 35.328-175.104-35.328-142.848-96.768-96.256-143.872-35.328-175.616 35.328-175.616 96.256-143.872 142.848-96.768 175.104-35.328zM690.176 556.032q10.24-10.24 15.872-26.624t5.632-33.792-6.144-33.792-18.432-25.6q-48.128-35.84-103.936-83.456t-120.32-89.6q-14.336-9.216-28.16-8.704t-25.088 8.192-17.92 22.528-6.656 35.328l0 386.048q0 23.552 8.704 36.864t22.016 17.92 28.16 2.048 26.112-11.776q25.6-19.456 53.76-44.032t56.832-50.176 56.32-51.712 53.248-49.664z"
                fill="black"
                p-id="22629"
              />

              <path
                class="playing-path"
                d="M512.000909-0.034088C229.207833-0.034088-0.033179 229.206924-0.033179 512c0 282.827164 229.2751 512.034088 512.034088 512.034088 282.827164 0 512.034088-229.241012 512.034088-512.034088C1024.034997 229.206924 794.828073-0.034088 512.000909-0.034088z m-100.763782 714.959254c0 30.883622-20.554993 56.108655-45.677763 56.108656h-22.838881c-25.12277 0-45.677763-25.225033-45.677763-56.108656V309.074834c0-30.849534 20.554993-56.108655 45.677763-56.108656h22.838881c25.12277 0 45.677763 25.259121 45.677763 56.108656v405.850332z m315.756059 0c0 30.883622-20.589081 56.108655-45.677763 56.108656h-22.838881c-25.156858 0-45.745939-25.225033-45.745939-56.108656V309.074834c0-30.849534 20.589081-56.108655 45.745939-56.108656h22.838881c25.088682 0 45.677763 25.259121 45.677763 56.108656v405.850332z"
                fill
                p-id="12815"
              />
            </svg>
          </span>
          <span class="song-name">{{song.name}}</span>
          <span class="song-set-btn" @click="setID=setID==song._id?'':song._id">
            <svg
              t="1570096405983"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="7917"
              width="200"
              height="200"
            >
              <path
                d="M1014.44204763 510.56975763c0-277.40996943-224.89055434-502.30052378-502.35086189-502.30052378-277.40731952 0-502.30184809 224.89055434-502.30184809 502.30052378 0 277.46163316 224.89452858 502.34953758 502.30184809 502.34953759C789.55149328 1012.91929521 1014.44204763 788.03139079 1014.44204763 510.56975763zM424.71470304 219.66762747c0-48.28432019 39.15575023-87.42814643 87.42814643-87.42814642 48.21940945 0 87.37648399 39.14382753 87.37648399 87.42814642 0 48.24722778-39.15707454 87.40297801-87.37648399 87.40297801C463.86912766 307.07060419 424.71470304 267.91485525 424.71470304 219.66762747zM424.71470304 510.59625165c0-48.27239749 39.15575023-87.40297801 87.42814643-87.40297802 48.21940945 0 87.37648399 39.13058052 87.37648399 87.40297802 0 48.24722778-39.15707454 87.40297801-87.37648399 87.40297801C463.86912766 597.99790405 424.71470304 558.84347943 424.71470304 510.59625165zM424.71470304 801.4970575c0-48.21940945 39.15575023-87.376484 87.42814643-87.376484 48.21940945 0 87.37648399 39.15707453 87.37648399 87.376484 0 48.27107318-39.15707454 87.45464174-87.37648399 87.45464174C463.86912766 888.95169924 424.71470304 849.76945499 424.71470304 801.4970575z"
                p-id="7918"
                fill="#2c2c2c"
              />
            </svg>
          </span>
        </div>

        <div class="song-item-row song-set" v-show="song._id==setID">
          <span class="songImage">{{song.songImage}}</span>
          <button
            :class="['paper-btn','song-del-btn']"
            @click="delSong(song._id)"
            v-bind:disabled="loading"
          >删除</button>
        </div>
      </div>
      <div class="btn-close-list" @click="showList=false">
        <span>></span>
        <span>></span>
        <span>></span>
      </div>
      <div class="btn-add">
        <button :class="['paper-btn']">
          <label for="local-play">
            本地播放
            <input type="file" id="local-play" @change="localPlay" />
          </label>
        </button>

        <button :class="['paper-btn']" @click="showUpload=true">在线添加</button>
      </div>
      <div :class="['upload-form',showUpload?'upload-form-active':'']">
        <div class="btn-upload-close" @click="showUpload=false">X</div>
        <div class="upload-form-controls">
          <input type="file" name="musicFile" @change="selectSong" ref="ulDom" />
          <input type="text" v-model="songImage" placeholder="为该歌曲添加图片地址吧" />
          <button :class="['paper-btn']" v-on:click="uploadSong">确认上传</button>
        </div>
        <!-- ({name:musicName,songUrl:musicUrl}) -->
        <!-- <button v-on:click="getSong">get</button> -->
      </div>
    </div>
    <HandDrawPlayer
      v-bind:resume.sync="resume"
      :song="currentSong"
      @song-ended="autoChange"
      v-slot:listButton
      ref="player"
    >
      <button
        :class="['btn-list',showList?'btn-list-active':'']"
        @click="()=>showList=!showList"
      >MyList</button>
    </HandDrawPlayer>
  </div>
</template>
<script>
import MusicService from "../api/musicService.js";
import HandDrawPlayer from "./player.vue";
export default {
  name: "music",
  components: {
    HandDrawPlayer
  },
  data() {
    return {
      songList: [
        {
          songUrl: "/イノトモ - キンモクセイ.mp3",

          songImage:
            "http://jibaofiles.s3.amazonaws.com/public/f7b7f324-01a4-4890-9479-88940e201cd1/9739f3df-7951-443d-b839-0ffadef781e6.jpg",
          name: "キンモクセイ"
        }
      ],
      currentSong: {
        songUrl: "/イノトモ - キンモクセイ.mp3",

        songImage:
          "http://jibaofiles.s3.amazonaws.com/public/f7b7f324-01a4-4890-9479-88940e201cd1/9739f3df-7951-443d-b839-0ffadef781e6.jpg",
        name: "キンモクセイ"
      },
      musicFile: {},
      songImage: "",
      loading: false,
      // error: "",
      // message: "",
      showList: false,
      showUpload: false,
      myMv: "",
      setID: "",
      resume: false
    };
  },
  methods: {
    autoChange() {
      // console.log("recieve success");
      const currentIndex = this.songList.findIndex(
        song => song.name == this.currentSong.name
      );
      let nextRandomIndex = Math.floor(Math.random() * this.songList.length);

      while (currentIndex == nextRandomIndex && this.songList.length > 1) {
        nextRandomIndex = Math.floor(Math.random() * this.songList.length);
      }
      this.currentSong = this.songList[nextRandomIndex];
      // this.currentSong = this.songList[
      //   Math.floor(Math.random() * (this.songList.length + 1))
      // ];
    },
    handlePlay() {
      const player = this.$refs.player;
      player.$refs.guideLine.classList.add("hidden-guide");
      currentSong._id == song._id ? player.startPlay() : (currentSong = song);
    },
    getSong: function() {
      this.loading = true;
      return MusicService.getMusic()
        .then(res => {
          this.songList = res;
          this.loading = false;
          this.currentSong = this.songList[0];
          this.$toast({
            text: "成功获取歌曲~~",
            mode: "success"
          });
        })
        .catch(err => {
          this.$toast({ text: "获取歌曲失败", mode: "danger" });
          this.loading = false;
        });
    },
    selectSong: function() {
      this.songFile = this.$refs.ulDom.files[0];
    },
    localPlay: function(e) {
      console.log("adddd");
      let song = e.target.files[0];
      //   audio.file = song;
      const reader = new FileReader();
      e.target.files = null;
      reader.readAsDataURL(song);
      reader.onload = e => {
        this.currentSong.songUrl = e.target.result;
        this.currentSong.name = song.name;
      };
    },
    delSong: function(id) {
      return MusicService.delMusic(id).then(() => {
        this.$toast({ text: "删除成功", mode: "success" });
        this.getSong();
      });
    },
    uploadSong: function() {
      const formData = new FormData();
      formData.append("musicFile", this.songFile);
      // console.log(formData.get("musicFile"));
      formData.append("songImage", this.songImage);
      this.message = "uploding...";
      MusicService.uploadMusic(formData)
        .then(res => {
          this.$toast({ text: res.data, mode: "success" });
          this.loading = false;
          this.songImage = "";
          this.songFile = "";
          this.showUpload = false;
          this.getSong();
        })
        .catch(err => {
          this.$toast({ text: "上传失败" + err, mode: "danger" });
        });
    }
  },
  watch: {
    currentSong: function() {
      this.$emit("postImg", this.currentSong.songImage);
    }
  },
  created() {
    this.getSong();
  },
  mounted() {
    // console.log(rough, MusicVisualizer);
    // this.myMv = new MusicVisualizer();
    // this.myMv.connect(this.$refs.myPlayer, 64, this.$refs.music);
    // this.myMv.create("Bar");
  }
};
</script>

<style lang='scss'>
.action-state {
  position: fixed;
  left: calc(50% + 18px);
  width: 120px;
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
.music {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.songList {
  position: fixed;
  width: 400px;
  right: 0;
  height: 100%;
  top: 0;
  transition: 1s all ease-in-out;
  transform: translateX(500px);
  border: black solid 6px;
  overflow: hidden;
  padding: 10px;
  box-sizing: border-box;
  z-index: 9999;
}
@keyframes move {
  0%,
  100% {
    background-position-x: left;
  }
  50% {
    background-position-x: right;
  }
}
.songList-active {
  transform: translateX(0px);
  background: #95fbfb7a;
  box-shadow: -7px 0px 3px 1px rgba(0, 0, 0, 0.4);
}
.songList-item {
  margin-bottom: 15px;
  padding: 10px;
  // border-bottom: 2px black double;
  transition: 0.5s all;
  &:hover {
    box-shadow: seagreen 1px 1px 1px 0px;
  }
  .song-item-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    path {
      transition: 1s fill ease;
    }
    .pause.song-play-btn {
      .pause-path {
        fill: black;
      }
      .playing-path {
        fill: transparent;
      }
    }
    .onplay.song-play-btn {
      .pause-path {
        fill: transparent;
      }
      .playing-path {
        fill: green;
      }
    }
    &.song-primary:hover,
    &.song-in-player {
      .pause.song-play-btn {
        .pause-path {
          fill: green;
        }
      }
      .onplay {
        .playing-path {
          fill: red;
        }
      }
      .song-set-btn {
        display: unset;
      }
    }
    .song-name {
      flex-grow: 1;
    }
    .song-play-btn,
    .song-set-btn {
      height: 20px;
      width: 20px;
      cursor: pointer;
      svg {
        height: 100%;
        width: 100%;
      }
    }
    .song-set-btn {
      display: none;
    }
  }
}
.songImage {
  display: none;
}
.songImage:hover {
  display: block;
}
.btn-close-list {
  overflow: hidden;
  position: absolute;
  top: 50%;
  left: 20px;
  animation: closeList 2s steps(4) infinite;
  cursor: pointer;
}
@keyframes closeList {
  0% {
    width: 0;
  }
  100% {
    width: 50px;
  }
}
.btn-add {
  position: absolute;
  width: 80%;
  right: 20px;
  bottom: 20px;
  display: flex;
  justify-content: space-around;
}
#local-play {
  display: none;
}
.upload-form {
  position: absolute;
  right: 20px;
  bottom: -200px;
  width: 80%;
  transform: translateY(0px);
  transition: all 2s ease-in-out;
  padding: 50px 10px;
  background-color: rgba(255, 255, 255, 0.8);
}
.upload-form-active {
  transform: translateY(-500px);
}
.btn-upload-close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: darkgray;
}
.btn-upload-close:hover {
  color: black;
}
.upload-form-controls {
  display: grid;
  place-content: center;
  grid-row-gap: 10px;
}

.paper-btn {
  transition: all 235ms ease 0s;
  box-shadow: 15px 28px 25px -18px rgba(0, 0, 0, 0.2);
  transition: all 235ms ease-in-out 0s;
  align-self: center;
  background: 0 0;
  border: 2px solid #41403e;
  color: #41403e;
  cursor: pointer;
  display: inline-block;
  font-size: 1rem;
  outline: 0;
  padding: 0.5rem;
  &.song-del-btn {
    font-size: 14px;
    padding: 0.2rem;
  }
}
.paper-btn:hover {
  transform: translate3d(0, 2px, 0);
  box-shadow: 2px 8px 8px -5px rgba(0, 0, 0, 0.3);
}
button,
.songList,
.upload-form {
  display: inline-block;
  border-bottom-left-radius: 15px 255px;
  border-bottom-right-radius: 225px 15px;
  border-top-left-radius: 255px 15px;
  border-top-right-radius: 15px 225px;
  border: 2px solid #41403e;
  transition: all 0.3s ease-in;
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
}
button:active {
  background-color: #fff;
  color: coral;
}
.btn-list-active {
  transform: translate(0px, 10px);
  background-color: black;
}
input[type="text"] {
  border: 0;
  border-bottom: 1px solid #000;
}
input[type="text"]:focus {
  border-bottom: 2px solid sandybrown;
  outline: 0;
}
</style>
