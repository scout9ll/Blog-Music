import Vue from "vue";
import App from "./App.vue";
import myHandDrawToast from "./plugins/myHandDrawToast";
Vue.config.productionTip = false;

Vue.use(myHandDrawToast);
new Vue({
  render: h => h(App)
}).$mount("#app");
