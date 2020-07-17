<template>
  <div :class="['upload-form',showUpload?'upload-form-active':'']">
    <div class="btn-upload-close" @click="closeUploader">X</div>
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
</template>

<script>
import * as MusicService from "@api/musicService";

export default {
  data() {
    return {
      songFile: "",
      songImage: "",
      loading: false
    };
  },
  methods: {
    closeUploader() {
      this.$store.commit("SET_SHOW_UPLOADER", false);
    },
    uploadSong() {
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
  }
};
</script>

<style>
</style>