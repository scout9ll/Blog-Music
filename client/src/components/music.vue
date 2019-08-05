<template>
  <div class="music" ref="music">
    <transition-group class="action-state" name="action-state" tag="div" style="font-size:.8rem">
      <div class="loading" v-if="loading" key="loading" style="color:black">loading...</div>
      <div class="error" v-if="error.length>1" key="error" style="color:red">{{error}}</div>
      <div class="message" v-if="message.length>1" key="message">{{message}}</div>
    </transition-group>
    <div :class="['songList',showList?'songList-active':'']">
      <div v-bind:key="song.songUrl" v-for="song in songList" class="songList-item">
        <span @dblclick="()=>currentSong=song">{{song.name}}</span>
        <span class="songImage">{{song.songImage}}</span>
        <!-- <span>{{song.songImage}}</span> -->
        <button @click="delSong(song._id)" v-bind:disabled="loading">删除</button>
      </div>
      <div class="add">
        <input type="file" name="musicFile" @change="selectSong" ref="ulDom" />
        <input type="text" v-model="songImage" />
        <button v-on:click="uploadSong">upload</button>
        <!-- ({name:musicName,songUrl:musicUrl}) -->
        <button v-on:click="getSong">get</button>
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
      myMv: ""
    };
  },
  methods: {
    autoChange() {
      // console.log("recieve success");
      const currentIndex = this.songList.findIndex(
        song => song.name == this.currentSong.name
      );
      let nextRandomIndex = Math.floor(
        Math.random() * (this.songList.length + 1)
      );

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
      this.loading = true;
      return MusicService.delMusic(id).then(() => {
        this.message = "删除成功!";
        this.getSong();
        setTimeout(() => (this.message = ""), 5000);
      });
    },
    uploadSong: function() {
      const formData = new FormData();
      formData.append("musicFile", this.songFile);
      // console.log(formData.get("musicFile"));
      formData.append("songImage", this.songImage);
      this.loading = false;
      MusicService.uploadMusic(formData).then(res => {
        this.message = res.data;
        this.loading = false;
        this.songImage = "";
        this.songFile = "";
        this.getSong();
        setTimeout(() => (this.message = ""), 5000);
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
}
.action-state-enter-active,
.action-state-leave-active {
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
.add {
  position: absolute;
  right: 20px;
  bottom: 20px;
}
button,
.songList {
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
button:focus {
  outline: 0;
}
.btn-list-active {
  transform: translate(0px, 10px);
  background-color: black;
}
</style>
