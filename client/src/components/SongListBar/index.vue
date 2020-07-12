<template>
  <div class="music" ref="music">
    <div :class="['songList',showList?'songList-active':'']">
      <div class="list-content-wrapper" ref="wrapper">
        <div class="list-content content">
          <song-list-item v-for="song in songList" :song="song" :key="song._id" />
        </div>
      </div>

      <!-- <div class="btn-close-list" @click="showList=false">
        <span>></span>
        <span>></span>
        <span>></span>
      </div>-->
      <div class="btn-add">
        <button :class="['paper-btn']">
          <label for="local-play">
            本地播放
            <input type="file" id="local-play" @change="localPlay" />
          </label>
        </button>

        <button :class="['paper-btn']" @click="showUpload=true">在线添加</button>
      </div>
      <song-editor />
      <div :class="['upload-form',showUpload?'upload-form-active':'']">
        <div class="btn-upload-close" @click="showUpload=false">X</div>
        <div class="upload-form-controls">
          <label for="musicFile">
            <div class="upload-btn paper-btn">.</div>
            <input type="file" id="musicFile" @change="selectSong" ref="ulDom" />
          </label>
          <div class="upload-info">
            <span class="file-name" v-text="songFile.name"></span>
            <input type="text" v-model="songImage" placeholder="为该歌曲添加图片地址吧" />
          </div>
          <button
            :class="['paper-btn',loading?`disable`:'']"
            v-on:click="uploadSong"
          >{{loading?'上传中':'确认上传'}}</button>
        </div>
        <!-- ({name:musicName,songUrl:musicUrl}) -->
        <!-- <button v-on:click="getSong">get</button> -->
      </div>
    </div>
    <HandDrawPlayer
      v-bind:songLoading.sync="songLoading"
      :song="currentSong"
      @song-ended="autoChange"
      ref="player"
    >
      <template v-slot:listButton>
        <button
          :class="['btn-list',showList?'btn-list-active':'']"
          @click="()=>showList=!showList"
        >MyList</button>
      </template>

      <template v-slot:state>
        <transition-group
          class="action-state"
          name="action-state"
          tag="div"
          style="font-size:.8rem"
          mode="out-in"
        >
          <canvas v-show="songLoading" id="song-load" key="songLoading"></canvas>
          <div class="loading" v-if="loading" key="loading" style="color:green">loading...</div>
          <!-- <div class="error" v-if="error.length>1" key="error" style="color:red">{{error}}</div>
          <div class="message" v-if="message.length>1" key="message">{{message}}</div>-->
        </transition-group>
      </template>
    </HandDrawPlayer>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
import BScroll from "better-scroll";
import * as MusicService from "../../api/musicService";
import HandDrawPlayer from "../player.vue";
import drawLoading from "../../visualPlayer/loadingAnimation";
import SongEditor from "./SongEditor";
import SongListItem from "./SongListItem";

export default {
  name: "music",
  components: {
    HandDrawPlayer,
    SongEditor,
    SongListItem
  },
  data() {
    return {
      scroll: {},
      songList: [{}],
      songFile: {},
      songImage: "",
      loading: false,
      showList: false,
      showUpload: false,
      myMv: "",
      setID: "",
      songLoading: true,
      showEdit: false,
      onEditSong: {}
    };
  },
  created() {
    this.getSong().then(() => {
      this.$toast({
        text: "成功获取歌曲~~",
        mode: "success"
      });
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.wrapper, {
          scrollY: true,
          click: true
        });
      });
    });
  },
  mounted() {
    drawLoading("song-load");
  },
  computed: {
    ...mapState(["currentSong", "playState", "soundPublisher"])
  },
  methods: {
    ...mapActions(["handlePress"]),
    ...mapMutations(["SET_CURRENT_SONG"]),
    autoChange() {
      // console.log("recieve success");
      const currentIndex = this.songList.findIndex(
        song => song.name == this.currentSong.name
      );
      let nextRandomIndex = Math.floor(Math.random() * this.songList.length);

      while (currentIndex == nextRandomIndex && this.songList.length > 1) {
        nextRandomIndex = Math.floor(Math.random() * this.songList.length);
      }
      this.$store.commit("SET_CURRENT_SONG", this.songList[nextRandomIndex]);
      // this.currentSong = this.songList[nextRandomIndex];
    },

    handlePreview() {
      // const cover = this.$root.$children[0].imgUrl;
      // const icon = document.querySelector(".btn-image-preview");
      // icon.classList.toggle("on-preview");
      // if (cover == this.onEditSong.songImage) {
      //   this.$emit(
      //     `postImg`,
      //     this.currentSong.songImage,
      //     this.currentSong.songImage
      //   );
      // } else {
      //   this.$emit(
      //     `postImg`,
      //     this.onEditSong.songImage,
      //     this.onEditSong.songImage
      //   );
      // }
    },
    shakePlayer() {
      this.$refs.player.$el.classList.add("shake");
      setTimeout(() => this.$refs.player.$el.classList.remove("shake"), 2000);
    },
    getSong() {
      this.loading = true;
      return MusicService.getSongList()
        .then(res => {
          this.songList = res;
          this.loading = false;
          this.currentSong._id
            ? ""
            : this.$store.commit("SET_CURRENT_SONG", this.songList[0]);
          this.scroll.refresh && this.scroll.refresh();
        })
        .catch(err => {
          this.shakePlayer();
          this.$toast({ text: "获取歌曲失败", mode: "danger" });
          this.loading = false;
        });
    },
    selectSong: function() {
      this.songFile = this.$refs.ulDom.files[0];
    },
    localPlay: function(e) {
      let song = e.target.files[0];
      if (!song.type.includes("audio")) {
        return this.$toast({ text: "请上传audio类型文件", mode: "danger" });
      }
      const reader = new FileReader();

      e.target.files = null;
      reader.readAsDataURL(song); //to base64
      reader.onload = e => {
        this.currentSong.songUrl = e.target.result;
        this.currentSong.name = song.name;
      };
    },
    delSong: function(id) {
      this.loading = true;
      return MusicService.delSong(id)
        .then(() => {
          this.$toast({ text: "删除成功", mode: "success" });
          this.loading = false;
          this.getSong();
        })
        .catch(({ response: { data } }) => {
          this.loading = false;
          this.shakePlayer();
          this.$toast({
            text: "操作失败,   " + data,
            mode: "danger",
            duration: 5000
          });
        });
    },

    uploadSong: function() {
      if (!this.songFile.type.includes("audio")) {
        return this.$toast({ text: "请上传audio类型文件", mode: "danger" });
      }
      const formData = new FormData();
      formData.append("musicFile", this.songFile);
      // console.log(formData.get("musicFile"));
      formData.append("songImage", this.songImage);
      this.loading = true;
      MusicService.upLoadSong(formData, uploadEvent => {
        console.log(uploadEvent);
      })
        .then(res => {
          this.$toast({ text: res.data, mode: "success" });
          this.loading = false;
          this.songImage = "";
          this.songFile = "";
          this.showUpload = false;
          this.getSong();
        })
        .catch(({ response: { data } }) => {
          this.loading = false;
          this.shakePlayer();
          this.$toast({
            text: "上传失败,   " + data,
            mode: "danger",
            duration: 5000
          });
        });
    }
  },
  watch: {
    currentSong: function() {
      // this.$emit("postImg", this.currentSong.songImage, this.currentSong.name);
      this.songLoading = true;
    }
  }
};
</script>

<style lang='scss'>
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
.list-content-wrapper {
  height: calc(100% - 60px);
  overflow: hidden;
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
.edit-form,
.upload-form {
  position: absolute;
  right: 20px;
  width: 80%;
  transform: translateY(0px);
  transition: all 2s ease-in-out;
  padding: 50px 10px;
  background-color: rgba(255, 255, 255, 0.8);
}
.upload-form {
  bottom: -500px;
}
.upload-form-active {
  transform: translateY(-900px);
}
.edit-form {
  top: -600px;
  .edit-form-controls {
    display: flex;
    flex-direction: column;
    font-size: 17px;
    text-align: start;
    padding: 10px;
    label > input {
      background: transparent;
      text-align: center;
    }
    .paper-btn {
      margin-top: 10px;
    }
    .btn-image-preview {
      transform: translateY(7px);
      display: inline-block;
      &:hover {
        .icon-preview path {
          fill: green;
        }
      }
      &.on-preview {
        .icon-preview path {
          fill: red;
        }
      }
      .icon-preview {
        height: 30px;
        width: 30px;
        path {
          fill: black;
        }
      }
    }
  }
}
.edit-form-active {
  transform: translateY(-50%);
  top: 50vh;
}
.btn-upload-close,
.btn-edit-close {
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
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  & > button {
    flex-basis: 60%;
    margin-top: 20px;
  }
  .file-name {
    font-size: 15px;
  }
  .upload-info {
    flex-basis: 60%;
  }
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
  &.disable {
    cursor: not-allowed;
    opacity: 0.5;
  }
}
.paper-btn:hover {
  transform: translate3d(0, 2px, 0);
  box-shadow: 2px 8px 8px -5px rgba(0, 0, 0, 0.3);
}
button,
.songList,
.upload-form,
.edit-form {
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
input[id="musicFile"] {
  display: none;
}
.upload-btn {
  padding: 0.6em 1em;
  background: linear-gradient(45deg, black, transparent),
    url(../../assets/arrow-icon.png) center/70% no-repeat;
  border-top-left-radius: 185px 160px;
  border-top-right-radius: 200px 195px;
  border-bottom-right-radius: 160px 195px;
  border-bottom-left-radius: 185px 190px;
}
.shake {
  animation: shake 1s ease-in-out;
}
@keyframes shake {
  from,
  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  10%,
  30%,
  50%,
  70%,
  90% {
    -webkit-transform: translate3d(-10px, 0, 0);
    transform: translate3d(-10px, 0, 0);
  }

  20%,
  40%,
  60%,
  80% {
    -webkit-transform: translate3d(10px, 0, 0);
    transform: translate3d(10px, 0, 0);
  }
}
</style>
