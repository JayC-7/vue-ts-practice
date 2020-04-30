import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import { install as localStorageInstall } from "./utils/localStorage";
import { install as UtilInstall } from "./utils";
import { install as alarmInstall } from "./utils/alarm";
import "./permission";

Vue.config.productionTip = false;

Vue.use(Antd);
localStorageInstall(Vue);
UtilInstall(Vue);
alarmInstall(Vue);

window.vue = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
