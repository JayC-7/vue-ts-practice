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

// 路由权限有两种：
//     1. 后端传入用户所有有权限的route name，前端过滤  ./permission.js
//     2. 后端传入用户roles，前端路由根据roles过滤      ./permissionRoles.js
// import "./permission";
import "./permissionRoles";

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
