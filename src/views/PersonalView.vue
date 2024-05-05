<template>
  <div class="personal-view">
    <div class="header">
      <a-row
        class="header-row"
        style="height: 100%"
        align="center"
        justify="center"
      >
        <a-col :span="8"> </a-col>
        <a-col :span="8">
          <a-space direction="vertical">
            <a-avatar :size="64">{{ user.userName[0].toUpperCase() }}</a-avatar>
            <div id="name">{{ user.userName }}</div>
            <a-space>
              <a-button type="text">
                <template #icon>
                  <IconEmail></IconEmail>
                </template>
              </a-button>
              <a-button type="text">
                <template #icon>
                  <IconEdit></IconEdit>
                </template>
              </a-button>
            </a-space>
          </a-space>
        </a-col>
        <a-col :span="8" />
      </a-row>
      <a-divider></a-divider>
      <a-row justify="center">
        <a-col :span="8" />
        <a-col :span="8"> </a-col>
        <a-col :span="8">
          <a-space>
            <a-statistic
              title="总提交"
              :value="user.totalSubmit"
              show-group-separator
            />
            <a-statistic
              title="完成题目"
              :value="user.acceptNum"
              show-group-separator
            />
            <a-statistic
              title="通过率"
              :value="user.acceptRate"
              :precision="2"
              :value-style="{ color: '#0fbf60' }"
            >
              <template #prefix>
                <icon-arrow-rise />
              </template>
              <template #suffix>%</template>
            </a-statistic>
          </a-space>
        </a-col>
      </a-row>
      <a-row class="personal-content" justify="center">
        <a-col :span="16">
          <a-card title="最近通过" hoverable>
            <a-list :max-height="240" :scrollbar="true">
              <a-list-item v-for="(item, index) of acc_list" :key="index">
                <a-list-item-meta
                  :title="item.questionName"
                  :description="item.description"
                >
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-card>
          <a-card title="提交记录" hoverable>
            <a-list :max-height="240" :scrollbar="true">
              <a-list-item v-for="(item, index) of submit_list" :key="index">
                <a-list-item-meta
                  :title="item.questionName"
                  :description="item.description"
                >
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card :style="{ width: '360px' }" title="我擅长的">
            <a-tag
              v-for="(item, index) in user.tags"
              v-bind:key="index"
              style="margin: 5px"
              :color="colors[index % 12]"
              >{{ item }}</a-tag
            >
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script setup lang="ts">
import { JudgeControllerService } from "@/api/roj-apis/judgeApi";
import { Message } from "@arco-design/web-vue";
import { IconEdit, IconEmail } from "@arco-design/web-vue/es/icon";
import { onMounted, reactive } from "vue";
import { useStore } from "vuex";
const store = useStore();
const user = reactive({
  userName: store.state.user.loginUser.name,
  tags: [
    "暴力",
    "二分",
    "二叉树",
    "链表",
    "动态规划",
    "图",
    "DFS",
    "BFS",
    "数学",
  ],
  acceptNum: 1000,
  acceptRate: 0.5,
  totalSubmit: 2000,
});
const acc_list = reactive([
  {
    id: "123",
    questionName: "A+B",
    description: "",
  },
]);
const submit_list = reactive([
  {
    id: "123",
    questionName: "A+B",
    description: "",
  },
]);
const colors = reactive([
  "orangered",
  "orange",
  "gold",
  "lime",
  "green",
  "cyan",
  "blue",
  "arcoblue",
  "purple",
  "pinkpurple",
  "magenta",
  "gray",
]);
const getUserDetail = async () => {
  const resp = await JudgeControllerService.getUserPageVoUsingGet();
  if (resp.code == 0) {
    console.log(resp.data, store.state.user.loginUser);
    Object.assign(user, resp.data);
    acc_list.length = 0;
    submit_list.length = 0;
    resp.data?.latestAccept?.forEach((source) => {
      var t1 = {
        id: "",
        contesnName: "",
        description: "",
      };
      Object.assign(t1, source);
      t1.description = source.createTime!;
      acc_list.push(t1);
    });
    resp.data?.latestSubmit?.forEach((source) => {
      var t1 = {
        id: "",
        questionName: "",
        description: "",
      };
      Object.assign(t1, source);
      t1.description = source.createTime!;
      submit_list.push(t1);
    });
  } else Message.error(resp.message!);
};
onMounted(() => {
  getUserDetail();
});
</script>
<style scoped>
.header {
  width: 100%;
  height: 200px;
  background-image: url(https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp);
}
.header-row {
  text-align: center;
}
.personal-view {
  margin: 40px 200px 0;
  height: 1000px;
  background-color: white;
}
</style>
