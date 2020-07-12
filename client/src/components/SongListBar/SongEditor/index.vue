<template>
  <div :class="['edit-form',showEditor?'edit-form-active':'']">
    <div class="btn-edit-close" @click="SET_SHOW_EDITOR(false)">X</div>
    <div class="edit-form-controls">
      <label for="songName">
        歌曲名
        <input id="songName" type="text" v-model="editingSong.name" />
      </label>

      <label for="songCover">
        背景图
        <input
          id="songCover"
          type="text"
          v-model="editingSong.songImage"
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
</template>

<script>
import * as MusicService from "../../../api/musicService";
import { mapState, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState(["editingSong", "showEditor"])
  },
  methods: {
    ...mapMutations(["SET_SHOW_EDITOR", "SET_EDITING_SONG"]),
    editSong() {
      return MusicService.updateSong(this.editingSong)
        .then(() => {
          this.$toast({ text: "更新成功", mode: "success" });
          this.loading = false;
          //   this.getSong();
        })
        .catch(({ response: { data } }) => {
          this.loading = false;
          //   this.shakePlayer();
          this.$toast({
            text: "操作失败,   " + data,
            mode: "danger",
            duration: 5000
          });
        });
    },
    handlePreview() {}
  }
};
</script>

<style>
</style>