<template>
  <a-row class="grid-demo" align="center">
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        theme="dark"
        :default-selected-keys="selectedKey"
        @menu-item-click="doMenuClick"
        style="height: 100%"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="logo">ROJ</div>
        </a-menu-item>
        <a-menu-item v-for="item in visibleRoutes" :key="item.path">{{
          item.name
        }}</a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <div class="userBox" v-on:click="doLogin">
        {{ store.state.user.loginUser.name }}
      </div>
    </a-col>
  </a-row>
  <LoginBox ref="loginRef" />
</template>
<style>
.grid-demo .arco-col {
  height: 64px;
  line-height: 64px;
  color: var(--color-white);
}
.logo {
  color: aqua;
  text-align: center;
  font-size: 40px;
  font-style: italic;
}
.grid-demo .arco-col:nth-child(2n) {
  height: 100%;
  background-color: black;
}
.userBox {
  text-align: center;
  color: aqua;
  height: 100%;
}
</style>
<script setup lang="ts">
import { routes } from "@/router/routes";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useStore } from "vuex";
import LoginBox from "@/components/LoginBox.vue";
import Access from "@/access/Access";
import { checkAccess } from "@/access/AccessCheck";
const router = useRouter();
const store = useStore();
const selectedKey = ref(["/"]);
const visibleRoutes = routes.filter((item, index) => {
  return checkAccess(store.state.user.loginUser, item.meta?.access as string);
});
router.afterEach((to, from, failure) => {
  selectedKey.value = [to.path];
});
const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};
let loginRef = ref();
const doLogin = () => {
  if (store.state.user.loginUser.access === Access.UN_LOGIN)
    loginRef.value.handleClick();
};
</script>
