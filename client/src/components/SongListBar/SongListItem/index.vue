<template>
  <div :class="[`songList-item` ,isSetting?'song-in-set':'']">
    <div :class="[`song-item-row` ,`song-primary`,currentSong._id==song._id?'song-in-player':'']">
      <span
        @click="handlePress(song)"
        :class="[`song-play-btn`,currentSong._id==song._id&&playState?`onplay`:'pause']"
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
      <span class="song-set-btn" @click="expandSet(song._id)">
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

    <div class="song-item-row song-set" v-if="isAuthenticated">
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
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import * as MusicService from "@api/musicService";
export default {
  props: ["song"],
  data() {
    return {
      isSetting: false,
      loading: false
    };
  },
  computed: {
    ...mapState(["currentSong", "playState", "isAuthenticated"])
  },
  methods: {
    ...mapMutations(["SET_SHOW_EDITOR", "SET_EDITING_SONG"]),
    ...mapActions(["handlePress"]),
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
    },
    handleEdit(song) {
      this.SET_SHOW_EDITOR(true);
      this.SET_EDITING_SONG({ ...song });
    },
    expandSet() {
      this.isSetting = !this.isSetting;
    }
  }
};
</script>

<style  lang='scss' soped>
.songList-item {
  margin-bottom: 15px;
  padding: 10px;
  height: 18px;
  // border-bottom: 2px black double;
  transition: 0.4s all;
  background: linear-gradient(180deg, transparent, transparent);
  overflow: hidden;
  &:hover {
    box-shadow: seagreen 1px 1px 1px 0px;
  }
  &.song-in-set {
    height: 60px;
    transition-delay: 0.4s;
    background: linear-gradient(180deg, #7bc199, #27663317);
  }
  .song-item-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &.song-set {
      justify-content: flex-end;
      margin-top: 8px;
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
</style>