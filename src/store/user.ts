import { StoreOptions } from "vuex";
import Access from "@/access/Access";
export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      name: "未登录",
      access: Access.UN_LOGIN,
    },
  }),
  getters: {},
  actions: {
    async setLoginUser({ commit }, playload) {
      commit("setUserName", playload);
    },
  },
  mutations: {
    setUserName(state, user) {
      state.loginUser.name = user.name;
      state.loginUser.access = user.access;
    },
  },
} as StoreOptions<any>;
