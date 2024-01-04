import { RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AdminView from "../views/AdminView.vue";
import Access from "@/access/Access";
export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "题库",
    component: HomeView,
    meta: {
      access: Access.UN_LOGIN,
    },
  },
  {
    path: "/admin",
    name: "管理员可见",
    component: AdminView,
    meta: {
      access: Access.ADMIN,
    },
  },
  {
    path: "/about",
    name: "关于我",
    meta: {
      access: Access.UN_LOGIN,
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];
