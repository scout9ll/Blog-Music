import toastComponent from "./toast.vue";
const toast = {};
toast.install = Vue => {
  Vue.prototype.$toast = function({ text, duration = 3000, mode = "primary" }) {
    const Toast = Vue.extend(toastComponent);
    const myToast = new Toast({
      //el,将实例挂载的对象,将会替代该元素,如果在实例化时存在这个选项，实例将立即进入编译过程，否则，需要显式调用 vm.$mount() 手动开启编译。
      el: document.createElement("div"),
      data() {
        return {
          text: text,
          duration: duration,
          mode: mode,
          isShow: true
        };
      }
    });
    //生成的dom为myToast.$el
    document.body.appendChild(myToast.$el);
    setTimeout(() => (myToast.$el.style.top = myToast.top));
  };
};
export default toast;
