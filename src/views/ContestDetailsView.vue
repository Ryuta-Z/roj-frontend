<template>
  <div class="contest-details">
    <div id="title" style="font-size: large; height: 80px; align-items: center">
      {{ contest.title }}
    </div>
    <a-row class="header" align="center">
      <a-col :span="8" :offset="8">
        <a-countdown
          v-if="contest.status == 0"
          title="距离开始还有"
          :value="Date.parse(contest.startTime) + 1000 * 60 * 60 * 24"
          :now="now"
          format="D 天 H 时 m 分 s 秒"
        />
        <a-countdown
          v-if="contest.status == 1"
          title="比赛剩余时间"
          :value="Date.parse(contest.endTime) + 1000 * 60 * 60 * 24"
          :now="now"
          format="D 天 H 时 m 分 s 秒"
        />
      </a-col>
      <a-col :span="8" v-if="contest.status == 0">
        <a-button type="outline" v-if="contest.isParticipated" status="success"
          >取消报名</a-button
        >
        <a-button type="primary" v-else> 报名比赛 </a-button>
      </a-col>
    </a-row>
    <a-divider />
    <a-row class="details-header">
      <a-descriptions
        style="width: 100%"
        :data="data"
        title="比赛详情"
        layout="vertical"
        bordered
      />
    </a-row>
    <a-divider />
    <a-list class="question-list">
      <a-list-item v-for="(question, index) in questions" :key="index">
        <a-list-item-meta :title="question.title">
          <template #avatar>
            <a-avatar shape="square">{{
              String.fromCharCode("A".charCodeAt(0) + index)
            }}</a-avatar>
          </template>
        </a-list-item-meta>
        <template #actions>
          <a-button v-if="contest.status == 1" type="text">
            <IconCode />
          </a-button>
        </template>
      </a-list-item>
    </a-list>
  </div>
</template>

<script setup lang="ts">
import { ContestControllerService } from "@/api/roj-apis/contestApi";
import { Message } from "@arco-design/web-vue";
import { IconCode } from "@arco-design/web-vue/es/icon";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { reactive } from "vue";
const router = useRouter();
const data = reactive([
  {
    label: "比赛名称",
    value: "比赛",
  },
  {
    label: "开始时间",
    value: new Date().toDateString(),
  },
  {
    label: "结束时间",
    value: new Date().toDateString(),
  },
  {
    label: "允许的语言",
    value: "Java/C++",
  },
  {
    label: "参赛人数",
    value: 10000,
  },
]);
const questions = [
  {
    id: "123",
    title: "A+B",
  },
  {
    id: "123",
    title: "A+B",
  },
  {
    id: "123",
    title: "A+B",
  },
];
const now = Date.now();
const contest = reactive({
  id: "123",
  title: "比赛",
  status: 1,
  startTime: "",
  endTime: "",
  isParticipated: true,
  coderNum: 0,
});
const getContestDetail = async () => {
  const contestId: string = router.currentRoute.value.query?.id;
  const resp = await ContestControllerService.getContestVoByIdUsingGet(
    contestId
  );
  if (resp.code == 0) {
    Object.assign(contest, resp.data);
    assignData();
  } else Message.error(resp.message!);
};
const assignData = () => {
  data[0].value = contest.title;
  data[1].value = contest.startTime;
  data[2].value = contest.endTime;
  data[4].value = contest.coderNum;
  console.log(data[1].value);
};
onMounted(() => {
  getContestDetail();
});
</script>
<style scoped>
#title {
  width: 100%;
  align-content: center;
  text-align: center;
  font-size: 80px;
}
.details-header,
.header {
  margin: 20px 30px 0;
}
.contest-details {
  height: 100vh;
  background-color: white;
  margin: 40px 200px 0;
}
.question-list {
  margin: 0 100px 0;
}
</style>
