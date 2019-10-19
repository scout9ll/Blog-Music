<template>
  <div :class="[`toast`,mode]" v-if="isShow">{{text}}</div>
</template>

<script>
export default {
  name: "toast",
  data() {
    return {
      text: "",
      duration: 1,
      isShow: true,
      mode: "primary",
      top: `15px`
    };
  },
  created() {
    const toastNum = document.querySelectorAll(".toast").length;
    console.log(toastNum);
    this.top = `${toastNum * 75 + 15}px`;
  },
  mounted() {
    setTimeout(() => {
      this.isShow = false;
    }, this.duration);
  }
};
</script>

<style lang='scss' scoped>
.toast {
  position: fixed;
  left: 50%;
  top: -20%;
  transform: translateX(-50%);
  transition: all 1s;
  border-bottom-left-radius: 15px 255px;
  border-bottom-right-radius: 225px 15px;
  border-top-left-radius: 255px 15px;
  border-top-right-radius: 15px 225px;
  border: 2px solid #41403e;
  margin-bottom: 20px;
  padding: 15px;
  width: 300px;
  &.primary {
    background-color: #c1c0bd;
    border-color: #41403e;
    color: #41403e;
  }
  &.success {
    background-color: #d0dbc2;
    border-color: #86a361;
    color: #86a361;
  }
  &.danger {
    background-color: #f0cbc9;
    border-color: #a7342d;
    color: #a7342d;
  }
}
</style>