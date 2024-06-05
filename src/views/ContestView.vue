<template>
  <div class="contestView">
    <a-card :bordered="false" :style="{ width: '100%' }">
      <a-card-grid
        v-for="(contest, index) in contests"
        :key="index"
        :hoverable="true"
        :style="{ width: '25%' }"
      >
        <a-card class="card-demo" :title="contest.title" :bordered="false">
          <template #extra>
            <a-button
              v-if="!contest.isParticipated && contest.status == 0"
              type="primary"
              size="mini"
              @click="join(index)"
              >快速报名</a-button
            >
            <div v-else-if="contest.isParticipated" style="color: green">
              <IconCheckSquare />已报名
            </div>
            <div v-else-if="contest.status == 1"><IconLoading />进行中</div>
          </template>
          <a-space>
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
            <a-button
              v-if="contest.status == 0 || contest.isParticipated"
              type="text"
              @click="goDetails(index)"
            >
              <template #icon>
                <IconRight></IconRight>
              </template>
            </a-button>
          </a-space>
        </a-card>
      </a-card-grid>
    </a-card>
    <a-divider />
    <a-row class="grid-demo">
      <a-col :span="12">
        <a-list class="user-list">
          <template #header>排行榜</template>
          <a-list-item v-for="(user, index) in users" v-bind:key="index">
            <a-list-item-meta
              :title="user.userName"
              :description="'已参加' + user.contestNum + '场竞赛'"
            >
              <template #avatar>
                <a-space>
                  <div>
                    {{ index + 1 }}
                  </div>
                  <a-avatar shape="square" :imageUrl="user.avator">
                    {{ users[index].userName[0].toUpperCase() }}
                  </a-avatar>
                </a-space>
              </template>
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </a-col>
      <a-col :span="12">
        <a-list class="contest-list">
          <template #header> 往期回顾 </template>
          <a-list-item
            v-for="(contest, index) in oldContest"
            v-bind:key="index"
          >
            <a-list-item-meta
              :title="contest.title"
              :description="contest.time"
            />
            <template #actions>
              <a-button type="text">
                <template #icon>
                  <IconBarChart />
                </template>
              </a-button>
            </template>
          </a-list-item>
        </a-list>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import {
  IconRight,
  IconCheckSquare,
  IconBarChart,
  IconLoading,
} from "@arco-design/web-vue/es/icon";
import { useRouter } from "vue-router";
import { ContestControllerService } from "@/api/roj-apis/contestApi";
import { Message } from "@arco-design/web-vue";
import { useStore } from "vuex";
const router = useRouter();
const now = Date.now();
const contests = reactive([
  {
    id: "123",
    title: "contest",
    startTime: "",
    endTime: "",
    isParticipated: true,
    status: 0,
  },
  {
    id: "123",
    title: "contest",
    startTime: "",
    endTime: "",
    isParticipated: false,
    status: 0,
  },
  {
    id: "2324",
    title: "contest",
    startTime: "",
    endTime: "",
    isParticipated: false,
    status: 0,
  },
]);
const users = reactive([
  {
    avator: "",
    userName: "Ryuta",
    contestNum: 100,
  },
  {
    avator: "",
    userName: "user",
    contestNum: 100,
  },
  {
    avator: "",
    userName: "user",
    contestNum: 100,
  },
]);
const oldContest = reactive([
  {
    id: "123",
    title: "contest",
    time: "1小时30分",
    isParticipated: false,
  },
  {
    id: "1234",
    title: "contest",
    time: "1小时30分",
    isParticipated: false,
  },
  {
    id: "12134",
    title: "contest",
    time: "1小时30分",
    isParticipated: false,
  },
]);
const goDetails = (index: number) => {
  router.push({
    path: "/contest/details",
    query: {
      id: contests[index].id,
    },
  });
};
const date2String = (dateS1: string, dateS2: string) => {
  const date1 = Date.parse(dateS1);
  const date2 = Date.parse(dateS2);
  const miniSeconds = date2 - date1;
  var seconds = Math.floor(miniSeconds / 1000);
  const days = Math.floor(seconds / (24 * 60 * 60));
  seconds %= 24 * 60 * 60;
  const hours = Math.floor(seconds / (60 * 60));
  seconds %= 60 * 60;
  const munites = Math.floor(seconds / 60);
  if (days > 0) {
    return days + "天" + hours + "小时" + munites + "分";
  } else return hours + "小时" + munites + "分";
};
const getContestList = async () => {
  const resp = await ContestControllerService.getContestListUsingGet();
  const contestList = resp.data!;
  console.log(contestList);
  if (resp.code == 0) {
    contests.length = 0;
    oldContest.length = 0;
    contestList.forEach((source) => {
      if (source.status! < 2) {
        var temp = {
          id: "",
          title: "",
          time: "",
          isParticipated: false,
          startTime: "",
          endTime: "",
          status: 0,
        };
        Object.assign(temp, source);
        temp.isParticipated = source.participated!;
        contests.push(temp);
      } else {
        var temp2 = {
          id: "",
          title: "",
          time: "",
          isParticipated: false,
        };
        Object.assign(temp2, source);
        temp2.time = date2String(source.startTime!, source.endTime!);
        oldContest.push(temp2);
      }
    });
  } else Message.success(resp.message!);
};
const topPlayer = async () => {
  const resp = await ContestControllerService.getTopListUsingGet();
  if (resp.code == 0) {
    users.length = 0;
    resp.data?.records?.forEach((source) => {
      if (source.userName != null) {
        var user = {
          avator: "",
          userName: "user",
          contestNum: 100,
        };
        Object.assign(user, source);
        users.push(user);
      }
    });
  }
};
const store = useStore();
const join = async (index: number) => {
  const resp = await ContestControllerService.joinContestUsingPost(
    contests[index].id as string,
    store.state.user.loginUser.id as string
  );
  if (resp.code == 0) {
    contests[index].isParticipated = true;
    Message.success("报名成功!");
  } else {
    Message.error(resp.message!);
  }
};
onMounted(() => {
  getContestList();
  topPlayer();
});
</script>

<style scoped>
.contestView {
  margin: 40px 100px 0px;
  background-color: white;
  height: 100vh;
}
.user-list {
  margin: 0 20px 0;
}
.contest-list {
  margin: 0 20px 0;
}
.arco-col:nth-child(1n) {
  background-color: white;
}
.grid-demo .arco-col:nth-child(2n) {
  background-color: white;
}
.card-demo {
  width: 100%;
}
.card-demo :deep(.arco-card-header) {
  border: none;
}
</style>
