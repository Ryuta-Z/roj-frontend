import { RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Access from "@/access/Access";
import QuestionView from "@/views/QuestionView.vue";
import SubmitView from "@/views/SubmitView.vue";
import LoginView from "@/views/LoginView.vue";
import ContestView from "@/views/ContestView.vue";
import ContestDetailsView from "@/views/ContestDetailsView.vue";
import PersonalView from "@/views/PersonalView.vue";
export const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "登录&注册",
    component: LoginView,
    meta: {
      access: Access.UN_LOGIN,
      isNavi: false,
    },
  },
  {
    path: "/",
    name: "题库",
    component: HomeView,
    meta: {
      access: Access.UN_LOGIN,
      isNavi: true,
    },
  },
  {
    path: "/contest",
    name: "竞赛",
    component: ContestView,
    meta: {
      access: Access.UN_LOGIN,
      isNavi: true,
    },
  },
  {
    path: "/contest/details",
    name: "竞赛详情",
    component: ContestDetailsView,
    props: true,
    meta: {
      access: Access.USER,
      isNavi: false,
    },
  },

  {
    path: "/question",
    name: "答题",
    props: true,
    component: QuestionView,
    meta: {
      access: Access.USER,
      isNavi: false,
    },
  },
  {
    path: "/submit",
    name: "提交记录",
    props: true,
    component: SubmitView,
    meta: {
      access: Access.USER,
      isNavi: true,
    },
  },
  {
    path: "/myself",
    name: "个人中心",
    component: PersonalView,
    meta: {
      access: Access.USER,
      isNavi: true,
    },
  },
  {
    path: "/about",
    name: "关于我",
    meta: {
      access: Access.UN_LOGIN,
      isNavi: true,
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];
