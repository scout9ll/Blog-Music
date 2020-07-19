<template>
  <div class="songList__container" ref="music">
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

        <button :class="['paper-btn']" @click="SET_SHOW_UPLOADER(true)">在线添加</button>
      </div>
      <song-editor />
      <song-uploader />
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
import BScroll from "better-scroll";
import * as MusicService from "../../api/musicService";
import drawLoading from "@helper/visualPlayer/loadingAnimation";
import SongEditor from "./SongEditor";
import SongListItem from "./SongListItem";
import SongUploader from "./SongUploader";
export default {
  name: "music",
  components: {
    SongEditor,
    SongListItem,
    SongUploader
  },
  data() {
    return {
      scroll: {},
      songFile: {},
      songImage: "",
      loading: false,
      myMv: "",
      songLoading: true
    };
  },
  created() {},
  mounted() {
    drawLoading("song-load");
    this.scroll = new BScroll(this.$refs.wrapper, {
      scrollY: true,
      click: true
    });
  },
  computed: {
    ...mapState([
      "currentSong",
      "playState",
      "soundPublisher",
      "showList",
      "songList"
    ])
  },
  methods: {
    ...mapActions(["handlePress"]),
    ...mapMutations(["SET_CURRENT_SONG", "SET_SHOW_UPLOADER"]),
    shakePlayer() {
      this.$refs.player.$el.classList.add("shake");
      setTimeout(() => this.$refs.player.$el.classList.remove("shake"), 2000);
    },
    localPlay(e) {
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
    delSong(id) {
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
    }
  },
  watch: {
    songList() {
      this.$nextTick(() => {
        this.scroll.refresh && this.scroll.refresh();
      });
    }
  }
};
</script>

<style lang='scss'>
.songList__container {
  display: flex;
  justify-content: center;
  align-items: center;
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
