import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import { Layout } from "@/components";

Vue.use(VueRouter);

const constantRoutes: Array<RouteConfig> = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/notFound",
    name: "404Page",
    component: () => import("@/views/errors/404Page.vue"),
  },
  {
    path: "*",
    redirect: "/notFound",
  },
];

const asyncRoutes: Array<RouteConfig> = [
  {
    path: "/",
    name: "index",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("@/views/dashboard/index.vue"),
        meta: {
          title: "Home",
        },
      },
    ],
  },
  {
    path: "/about",
    component: Layout,
    children: [
      {
        name: "about",
        path: "",
        component: () => import("@/views/About.vue"),
        meta: {
          title: "About",
        },
      },
    ],
  },
  {
    path: "/dashboard",
    component: Layout,
    children: [
      {
        path: "",
        name: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        meta: {
          title: "Dashboard",
        },
      },
    ],
  },
  {
    path: "/permission",
    name: "permission",
    component: Layout,
    redirect: "/permission/user",
    meta: {
      title: "Permission"
    },
    children: [
      {
        path: "admin",
        name: "permission_admin",
        component: () => import("@/views/permission/admin.vue"),
        meta: {
          title: "Admin"
        }
      },
      {
        path: "user",
        name: "permission_user",
        component: () => import("@/views/permission/user.vue"),
        meta: {
          title: "User"
        }
      },
    ],
  },
];

const routes: Array<RouteConfig> = [...asyncRoutes, ...constantRoutes];

export function createRouter(): any {
  return new VueRouter({
    routes,
  });
}

const router = createRouter();

export { constantRoutes, asyncRoutes };
export default router;
