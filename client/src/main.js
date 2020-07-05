import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import myHandDrawToast from "./plugins/myHandDrawToast";
Vue.config.productionTip = false;

Vue.use(myHandDrawToast);
new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
