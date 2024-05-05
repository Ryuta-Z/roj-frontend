<template>
  <div class="about">
    <a-space direction="vertical" size="large" class="infobox">
      <a-avatar :size="64">
        <img
          alt="avatar"
          src="https://avatars.githubusercontent.com/u/53412545?v=4"
        />
      </a-avatar>
      <a-descriptions
        style="margin-top: 20px"
        :data="Info"
        size="large"
        title="项目信息"
        :column="1"
      >
        <a-descriptions-item
          v-for="i of others"
          :label="Info[i].label"
          v-bind:key="Info[i].label"
        >
          <div>{{ Info[i].value }}</div>
        </a-descriptions-item>

        <a-descriptions-item
          v-for="i of links"
          :label="Info[i].label"
          v-bind:key="Info[i].label"
        >
          <a-link :href="Info[i].value">{{ Info[i].value }}</a-link>
        </a-descriptions-item>
      </a-descriptions>
    </a-space>
  </div>
</template>
<script setup lang="ts">
import { IconGithub } from "@arco-design/web-vue/es/icon";
const others = [0, 1, 2];
const links = [3, 4, 5];
const Info = [
  {
    label: "前端技术栈",
    value: "Vue3+TypeScript+ArcoDesign+MonacoEditor+ByteMD",
  },
  {
    label: "后端技术栈",
    value: "SpringBoot+MySQL+MyBatisPlus+Hutool+Knife4j",
  },
  {
    label: "代码沙箱技术栈",
    value: "SpringBoot+Docker",
  },
  {
    label: "项目前端地址",
    value: "https://github.com/Ryuta-Z/roj-frontend",
  },
  {
    label: "项目后端地址",
    value: "https://github.com/Ryuta-Z/roj-backend",
  },
  {
    label: "代码沙箱地址",
    value: "https://github.com/Ryuta-Z/roj-sandbox",
  },
];
</script>
<style>
.about {
  width: 600px;
  height: 500px;
  margin: 40px auto auto auto;
  align-items: center;
  background-color: white;
  display: flex;
  box-shadow: 5px 5px 5px #00000014, 5px -5px 5px #00000014,
    -5px 5px 5px #00000014, -5px -5px 5px #00000014;
}
.infobox {
  display: flex;
  align-items: center;
  width: 100%;
}
</style>
