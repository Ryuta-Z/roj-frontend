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
          :value="Date.parse(contest.startTime)"
          :now="now"
          format="D 天 H 时 m 分 s 秒"
        />
        <a-countdown
          v-if="contest.status == 1"
          title="比赛剩余时间"
          :value="Date.parse(contest.endTime)"
          :now="now"
          format="D 天 H 时 m 分 s 秒"
        />
      </a-col>
      <a-col :span="8"> </a-col>
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
    <a-list class="question-list" v-if="contest.status == 1">
      <a-list-item
        v-for="(question, index) in questions"
        :key="index"
        :style="getColor(index)"
      >
        <a-list-item-meta :title="question.title">
          <template #avatar>
            <a-avatar shape="square">{{
              String.fromCharCode("A".charCodeAt(0) + index)
            }}</a-avatar>
          </template>
        </a-list-item-meta>
        <template #actions>
          <a-space>
            <IconCheckCircle
              style="size: 30px; color: green"
              v-if="question.accept"
            />
            <div>
              {{ question.score + ".pt" }}
            </div>
            <a-button type="text" @click="hack(index)">
              <IconCode />
            </a-button>
          </a-space>
        </template>
      </a-list-item>
    </a-list>
    <a-result v-else title="比赛未开始">
      <template #subtitle>
        {{ "比赛将于 " + contest.startTime + " 开始" }}
      </template>
      <template #extra>
        <a-space>
          <a-button
            type="outline"
            v-if="contest.isParticipated"
            status="success"
            @click="cancel"
            >取消报名</a-button
          >
          <a-button type="primary" v-else @click="join"> 报名比赛 </a-button>
        </a-space>
      </template>
    </a-result>
  </div>
</template>

<script setup lang="ts">
import { ContestControllerService } from "@/api/roj-apis/contestApi";
import { Message } from "@arco-design/web-vue";
import { IconCode, IconCheckCircle } from "@arco-design/web-vue/es/icon";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { reactive } from "vue";
import { useStore } from "vuex";
import {
  QuestionControllerService,
  QuestionVO,
} from "@/api/roj-apis/questionApi";
import { JudgeControllerService } from "@/api/roj-apis/judgeApi";
const router = useRouter();
const store = useStore();
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
    value: "Java/C++/C",
  },
  {
    label: "参赛人数",
    value: 10000,
  },
]);
const questions = reactive([
  {
    id: "123",
    title: "A+B",
    score: 20,
    accept: false,
  },
  {
    id: "123",
    title: "A+B",
    score: 30,
    accept: false,
  },
  {
    id: "123",
    title: "A+B",
    score: 50,
    accept: false,
  },
]);
const getColor = (index: number) => {
  if (questions[index].accept) {
    return { backgroundColor: "#b2f1a8" };
  }
  return null;
};
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
const hack = (index: number) => {
  router.push({
    path: "/question",
    query: {
      id: questions[index].id,
    },
  });
};
const join = async () => {
  const resp = await ContestControllerService.joinContestUsingPost(
    contest.id as string,
    store.state.user.loginUser.id as string
  );
  if (resp.code == 0) {
    contest.isParticipated = true;
    Message.success("报名成功!");
  } else {
    Message.error(resp.message!);
  }
};
//取消报名
const cancel = async () => {
  const resp = await ContestControllerService.cancelParticipateUsingPost(
    contest.id as string,
    store.state.user.loginUser.id as string
  );
  if (resp.code == 0) {
    contest.isParticipated = false;
    Message.success("已取消");
  } else {
    Message.error(resp.message!);
  }
};
const getContestDetail = async () => {
  const contestId = router.currentRoute.value.query?.id;
  const resp = await ContestControllerService.getContestVoByIdUsingGet(
    contestId as string
  );
  if (resp.code == 0) {
    Object.assign(contest, resp.data);
    contest.isParticipated = resp.data?.participated;
    contest.startTime = new Date(contest.startTime).toLocaleString();
    contest.endTime = new Date(contest.endTime).toLocaleString();
    assignData();
  } else Message.error(resp.message!);
};
const assignData = () => {
  data[0].value = contest.title;
  data[1].value = contest.startTime;
  data[2].value = contest.endTime;
  data[4].value = contest.coderNum;
};

const getQuestionList = async () => {
  const resp = await QuestionControllerService.getContestQuestionListUsingGet(
    router.currentRoute.value.query?.id as string
  );
  const resp2 =
    await JudgeControllerService.listLatestAcceptedQuestionSubmitUsingGet();

  if (resp.code == 0 && resp2.code == 0) {
    questions.length = 0;
    resp.data?.forEach((source) => {
      questions.push(source as QuestionVO);
    });
    //判断是否通过
    for (let i = 0; i < questions.length; i++) {
      var s = resp2.data?.find((item) => {
        return (
          item.judgeInfo?.message == "Accepted" &&
          (item.questionId as string) == questions[i].id
        );
      });
      if (s) {
        questions[i].accept = true;
      }
    }
  }
};
onMounted(() => {
  getContestDetail();
  getQuestionList();
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
