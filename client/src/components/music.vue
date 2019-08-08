<template>
  <div class="music" ref="music">
    <transition-group
      class="action-state"
      name="action-state"
      tag="div"
      style="font-size:.8rem"
      mode="out-in"
    >
      <div class="loading" v-if="loading" key="loading" style="color:black">loading...</div>
      <div class="error" v-if="error.length>1" key="error" style="color:red">{{error}}</div>
      <div class="message" v-if="message.length>1" key="message">{{message}}</div>
    </transition-group>
    <div :class="['songList',showList?'songList-active':'']">
      <div v-bind:key="song.songUrl" v-for="song in songList" class="songList-item">
        <span @dblclick="()=>currentSong=song">{{song.name}}</span>
        <span class="songImage">{{song.songImage}}</span>
        <!-- <span>{{song.songImage}}</span> -->
        <button :class="['paper-btn']" @click="delSong(song._id)" v-bind:disabled="loading">删除</button>
      </div>
      <div class="btn-add">
        <button :class="['paper-btn']" @click="showUpload=true">添加歌曲</button>
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
    <HandDrawPlayer :song="currentSong" @song-ended="autoChange" v-slot:listButton>
      <button
        :class="['btn-list',showList?'btn-list-active':'']"
        @click="()=>showList=!showList"
      >MyList</button>
    </HandDrawPlayer>
  </div>
</template>
<script>
import MusicService from "../musicService";
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
      error: "",
      message: "",
      showList: false,
      showUpload: false,
      myMv: ""
    };
  },
  methods: {
    autoChange() {
      // console.log("recieve success");
      const currentIndex = this.songList.findIndex(
        song => song.name == this.currentSong.name
      );
      let nextRandomIndex = Math.floor(Math.random() * this.songList.length);

      while (currentIndex == nextRandomIndex) {
        nextRandomIndex = Math.floor(Math.random() * this.songList.length);
      }
      this.currentSong = this.songList[nextRandomIndex];
      // this.currentSong = this.songList[
      //   Math.floor(Math.random() * (this.songList.length + 1))
      // ];
    },
    getSong: function() {
      this.loading = true;
      return MusicService.getMusic()
        .then(res => {
          this.songList = res;
          this.loading = false;
          this.currentSong = this.songList[0];
        })
        .catch(err => {
          // console.log(error);
          this.error = "获取失败";
          // console.log(this.error);
          this.loading = false;
          setTimeout(() => (this.error = ""), 3000);
        });
    },
    selectSong: function() {
      this.songFile = this.$refs.ulDom.files[0];
    },
    delSong: function(id) {
      this.message = "正在删除...";
      return MusicService.delMusic(id).then(() => {
        this.message = "删除成功!";
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
          this.message = res.data;
          this.loading = false;
          this.songImage = "";
          this.songFile = "";
          this.getSong();
        })
        .catch(err => {
          // console.log(err.response);
          this.error = err.response.data;
          this.message = "";
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

<style>
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

  /* background: linear-gradient(to bottom, #4da0b0, #d39d38); */
}
.songList-active {
  transform: translateX(0px);
  background-color: #ffffff54;
  box-shadow: -7px 0px 3px 1px rgba(0, 0, 0, 0.4);
}
.songList-item {
  display: flex;
  justify-content: space-around;
  margin-bottom: 15px;
  padding: 10px;
  border-bottom: 2px black double;
}
.songImage {
  display: none;
}
.songImage:hover {
  display: block;
}
.btn-add {
  position: absolute;
  right: 20px;
  bottom: 20px;
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
  left: 153px;
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
