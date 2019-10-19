<template>
  <div class="music" ref="music">
    <div :class="['songList',showList?'songList-active':'']">
      <div
        v-bind:key="song._id"
        v-for="song in songList"
        class="songList-item"
        :style="{background:song._id==setID?'linear-gradient(180deg, #7bc199, #27663317)':''}"
      >
        <div
          :class="[`song-item-row` ,`song-primary`,currentSong._id==song._id?'song-in-player':'']"
        >
          <span
            @click="handlePlay(song)"
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
            :class="['paper-btn','song-del-btn',loading?`disable`:'']"
            @click="delSong(song._id)"
          >删除</button>
          <button
            :class="['paper-btn','song-del-btn',loading?`disable`:'']"
            @click="handleEdit(song)"
          >编辑</button>
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
      <div :class="['edit-form',showEdit?'edit-form-active':'']">
        <div class="btn-edit-close" @click="showEdit=false">X</div>
        <div class="edit-form-controls">
          <label for="songName">
            歌曲名
            <input id="songName" type="text" v-model="onEditSong.name" />
          </label>

          <label for="songCover">
            背景图
            <input
              id="songCover"
              type="text"
              v-model="onEditSong.songImage"
              placeholder="为该歌曲添加图片地址吧"
            />
            <span
              class="btn-image-preview"
              aria-label="预览背景"
              title="预览背景"
              @click.prevent="handlePreview"
            >
              <svg
                t="1570617460355"
                class="icon-preview"
                viewBox="0 0 1422 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="4532"
                width="200"
                height="200"
              >
                <path
                  d="M14.747612 0m63.158941 0l1263.1788 0q63.15894 0 63.15894 63.15894l0 0q0 63.15894-63.15894 63.15894l-1263.1788 0q-63.15894 0-63.158941-63.15894l0 0q0-63.15894 63.158941-63.15894Z"
                  fill="#ffffff"
                  p-id="4533"
                />
                <path
                  d="M235.803903 126.31788v473.69205h947.3841V126.31788H235.803903zM109.486023 0h1200.01986v631.5894a94.73841 94.73841 0 0 1-94.73841 94.73841H204.224433a94.73841 94.73841 0 0 1-94.73841-94.73841V0z"
                  fill="#ffffff"
                  p-id="4534"
                />
                <path
                  d="M330.542313 221.05629m63.15894 0l631.5894 0q63.15894 0 63.15894 63.15894l0 0q0 63.15894-63.15894 63.15894l-631.5894 0q-63.15894 0-63.15894-63.15894l0 0q0-63.15894 63.15894-63.15894Z"
                  fill="#ffffff"
                  p-id="4535"
                />
                <path
                  d="M646.337013 947.3841m0-63.15894l0-221.05629q0-63.15894 63.15894-63.15894l0 0q63.15894 0 63.15894 63.15894l0 221.05629q0 63.15894-63.15894 63.15894l0 0q-63.15894 0-63.15894-63.15894Z"
                  fill="#ffffff"
                  p-id="4536"
                />
                <path
                  d="M1088.449593 1010.54304m-63.15894 0l-631.5894 0q-63.15894 0-63.15894-63.15894l0 0q0-63.15894 63.15894-63.15894l631.5894 0q63.15894 0 63.15894 63.15894l0 0q0 63.15894-63.15894 63.15894Z"
                  fill="#ffffff"
                  p-id="4537"
                />
              </svg>
            </span>
          </label>

          <button :class="['paper-btn',loading?`disable`:'']" v-on:click="editSong">确认编辑</button>
        </div>
      </div>
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
      v-bind:resume.sync="resume"
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
import MusicService from "../api/musicService.js";
import HandDrawPlayer from "./player.vue";
import drawLoading from "../visualPlayer/loadingAnimation";
export default {
  name: "music",
  components: {
    HandDrawPlayer
  },
  data() {
    return {
      songList: [{}],
      currentSong: {
        songUrl: ""
      },
      songFile: {},
      songImage: "",
      loading: false,
      showList: false,
      showUpload: false,
      myMv: "",
      setID: "",
      resume: false,
      songLoading: true,
      showEdit: false,
      onEditSong: {}
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
    },
    handlePlay(song) {
      const player = this.$refs.player;
      player.$refs.guideLine.classList.add("hidden-guide");
      this.currentSong._id == song._id
        ? player.startPlay()
        : (this.currentSong = song);
    },
    handleEdit(song) {
      this.onEditSong = { ...song };
      this.showEdit = true;
    },
    handlePreview() {
      const cover = this.$root.$children[0].imgUrl;
      const icon = document.querySelector(".btn-image-preview");
      icon.classList.toggle("on-preview");
      if (cover == this.onEditSong.songImage) {
        this.$emit(`postImg`, this.currentSong.songImage);
      } else {
        this.$emit(`postImg`, this.onEditSong.songImage);
      }
    },
    shakePlayer() {
      this.$refs.player.$el.classList.add("shake");
      setTimeout(() => this.$refs.player.$el.classList.remove("shake"), 2000);
    },
    getSong: function() {
      this.loading = true;
      return MusicService.getMusic()
        .then(res => {
          this.songList = res;
          this.loading = false;
          this.currentSong._id ? "" : (this.currentSong = this.songList[0]);
          this.$toast({
            text: "成功获取歌曲~~",
            mode: "success"
          });
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
      return MusicService.delMusic(id)
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
    editSong: function() {
      return MusicService.updateMusic(this.onEditSong)
        .then(() => {
          this.$toast({ text: "更新成功", mode: "success" });
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
      MusicService.uploadMusic(formData)
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
      this.$emit("postImg", this.currentSong.songImage);
      this.songLoading = true;
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
    drawLoading("song-load");
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
    &.song-set {
      justify-content: flex-end;
      button {
        margin: 0 10px;
      }
    }
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
.edit-form,
.upload-form {
  position: relative;
  right: 20px;
  bottom: -900px;
  width: 80%;
  transform: translateY(0px);
  transition: all 2s ease-in-out;
  padding: 50px 10px;
  background-color: rgba(255, 255, 255, 0.8);
}
.upload-form-active {
  transform: translateY(-900px);
}
.edit-form {
  top: -500px;
  .edit-form-controls {
    display: flex;
    flex-direction: column;
    font-size: 17px;
    text-align: start;
    padding: 10px;
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
  transform: translateY(500px);
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
    url(../assets/arrow-icon.png) center/70% no-repeat;
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
