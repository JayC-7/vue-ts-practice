import router, { asyncRoutes } from "./router";
import store from "./store";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";
import { GET_MENUS_REQUEST, SET_MENUS } from "./store/types";
import { RouteConfig } from "vue-router";

const whiteList = ["/login", "/register"];

const filterRoutes = (routes: [], permissions: []) => {
  const temp: any[] = [];
  routes.forEach((item: any) => {
    const tempItem = { ...item };

    // children.length > 0
    //   （Y） filtered children routes length > 0 ?
    //         （Y） item push
    //   （N） item has name?
    //         （Y） has permission?
    //                （Y） item push
    if (item.children && item.children.length > 0) {
      const childs = filterRoutes(tempItem.children, permissions);
      if (childs.length > 0) {
        tempItem.children = childs;
        temp.push(tempItem);
      }
    } else {
      if (item.name && permissions.indexOf(item.name as never) > -1) {
        temp.push(tempItem);
      }
    }
  });

  return temp;
};

// 后端传入permission routes
/* eslint-disable */
router.beforeEach(
  async (to: any, from: any, next: any): Promise<any> => {
    Nprogress.start();
    // 判断是否登录
    //     （Y）判断store.state.menus是否为空
    //          （Y）getMenu & 按返回数据修改路由表
    //          （N）next()
    //     （N）路由是否在白名单中
    //            （Y）next()
    //            （N）重定向登录
    const token = window.utils.getToken();

    if (token) {
      const hasMenus =
        store.getters.asyncRoutes && store.getters.asyncRoutes.length > 0;

      // 若无routes去获取routes
      if (!hasMenus) {
        // 接口获取permissions
        const permissions = await store.dispatch(GET_MENUS_REQUEST);
        const routes = filterRoutes(asyncRoutes as [], permissions);
        store.commit(SET_MENUS, routes);
      }
      // login重定向到/
      if (to.path === "/login") {
        next("/");
      } else {
        next();
      }
    } else {
      if (whiteList.indexOf(to.path) < 0) {
        next(`/login?redirect=${to.path}`);
      } else {
        next();
      }
    }
  }
);

router.afterEach(() => {
  Nprogress.done();
});

