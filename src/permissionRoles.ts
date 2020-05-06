import router, { asyncRoutes } from "./router";
import { RouteConfig } from "vue-router";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";
import store from "./store";
import { GET_USER_PROFILE, SET_MENUS } from "./store/types";

const whiteList = ["/login", "/register"];

export const filterRoutes = (routes: RouteConfig[], roles: string[]) => {
  const list: RouteConfig[] = [];

  routes.forEach((item: any) => {
    const temp = { ...item };
    if (temp.children && temp.children.length > 0) {
      temp.children = filterRoutes(temp.children, roles);
      list.push(temp);
    } else {
      if (temp.meta && temp.meta.roles && temp.meta.roles.length > 0) {
        temp.meta.roles.some(
          (item: string) => roles.indexOf(item as never) > -1
        ) && list.push(temp);
      } else {
        list.push(temp);
      }
    }
  });

  return list;
};

// 前端存放所有routes，后端传入roles，前端过滤routes
router.beforeEach(async (to: any, from: any, next: any) => {
  Nprogress.start();

  const token = window.utils.getToken();

  if (token) {

    // 取menus
    const hasMenus =
      store.getters.asyncRoutes && store.getters.asyncRoutes.length > 0;
    if (!hasMenus) {

      // 取roles
      const hasRoles =
        store.getters.userProfile.roles && store.getters.roles.length > 0;
      let roles;
      if (hasRoles) {
        roles = store.getters.userProfile.roles;
      } else {
        roles = (await store.dispatch(GET_USER_PROFILE)).roles;
      }

      const routes = filterRoutes(asyncRoutes, roles);
      store.commit(SET_MENUS, routes);
    }

    next();

  } else {
    if (whiteList.indexOf(to.path) < 0) {
      next(`/login?redirect=${to.path}`);
    } else {
      next();
    }
  }
});

router.afterEach(() => {
  Nprogress.done();
});
