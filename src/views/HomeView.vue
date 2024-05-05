<template>
  <div class="home">
    <div class="header">在线题库</div>
    <a-divider />
    <a-row
      :gutter="[24, 12]"
      style="max-width: 100%; margin: 0"
      justify="center"
    >
      <a-col :span="8" class="id_in">
        <a-space>
          <div>题目编号</div>
          <a-input
            placeholder="请输入题目编号"
            :max-length="20"
            allow-clear
            show-word-limit
            v-model="searchParams.id"
          />
        </a-space>
      </a-col>
      <a-col :span="8" class="title_id">
        <a-space>
          <div>题目名称</div>
          <a-input
            placeholder="请输入题目名称"
            :max-length="20"
            allow-clear
            show-word-limit
            v-model="searchParams.title"
          />
        </a-space>
      </a-col>
      <a-col :span="8" class="searchButton">
        <a-button type="primary" @click="doSearch">
          <template #icon>
            <IconSearch />
          </template>
          搜索</a-button
        >
      </a-col>
      <a-col :span="8" class="tag_id">
        <a-space>
          <div>标签名称</div>
          <a-input
            placeholder="请输入标签名称"
            :max-length="20"
            allow-clear
            show-word-limit
            v-model="searchParams.tag"
          />
        </a-space>
      </a-col>
      <a-col :span="8" class="contest-name">
        <a-space>
          <div>所属竞赛</div>
          <a-input
            placeholder="请输入竞赛名称"
            :max-length="20"
            allow-clear
            show-word-limit
            v-model="searchParams.contestName"
          />
        </a-space>
      </a-col>
      <a-col :span="8" class="searchButton">
        <a-button @click="doReset">
          <template #icon>
            <IconRefresh />
          </template>
          重置</a-button
        >
      </a-col>
    </a-row>
    <a-divider />
    <a-table :columns="columns" :data="list" :sticky-header="100">
      <template #optional="{ record }">
        <a-button type="primary" @click="doQuestion(record)">做题</a-button>
      </template>
      <template #tags="{ record }">
        <a-space wrap>
          <a-tag
            v-for="(tag, index) of record.tagList"
            :key="index"
            color="green"
            >{{ tag }}</a-tag
          >
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { Message } from "@arco-design/web-vue";
import { useRouter } from "vue-router";
import BigNumber from "bignumber.js";
import { IconSearch, IconRefresh } from "@arco-design/web-vue/es/icon";
import { QuestionControllerService } from "@/api/roj-apis/questionApi";
const router = useRouter();
const pageIndex = {
  current: 0,
  pageSize: 100,
};
const columns = [
  {
    title: "题目编号",
    dataIndex: "id",
  },
  {
    title: "标题",
    dataIndex: "title",
  },
  {
    title: "通过率(%)",
    dataIndex: "rate",
  },
  {
    title: "标签",
    slotName: "tags",
  },
  {
    title: "来源",
    dataIndex: "contestName",
  },
  {
    title: "",
    slotName: "optional",
  },
];
const list = reactive([
  {
    id: "123",
    title: "qwe",
    tagList: ["qew"],
    rate: 0,
    contestName: "RACC-th1",
  },
]);
interface Item {
  id: string;
  title: string;
  tagList: [];
  acceptedNum: number;
  submitNum: number;
  contestName: string;
}
const searchParams = reactive({
  id: "",
  title: "",
  tag: "",
  contestName: "",
});
const getQuestionList = async () => {
  const resp = await QuestionControllerService.listQuestionVoByPageUsingPost({
    pageSize: pageIndex.pageSize,
    current: pageIndex.current,
  });
  if (resp.code != 0) {
    Message.error(resp.message);
  } else {
    const questionList = resp.data.records;
    list.length = 0;
    questionList.forEach((item: Item) => {
      list.push({
        id: item.id,
        title: item.title,
        tagList: item.tagList,
        rate:
          item.acceptedNum == 0 ? 0 : (item.acceptedNum / item.submitNum) * 100,
        contestName: item.contestName,
      });
    });
  }
};
const doQuestion = (question: Item) => {
  router.push({
    path: "/question",
    query: { id: question.id },
  });
};
const doSearch = async () => {
  const resp = await QuestionControllerService.listQuestionVoByPageUsingPost({
    id: searchParams.id,
    title: searchParams.title,
    tags: searchParams.tag === "" ? [] : [searchParams.tag],
    contestName: searchParams.contestName,
  });
  if (resp.code != 0) {
    Message.error(resp.message);
  } else {
    const questionList = resp.data.records;
    list.length = 0;
    questionList.forEach((item: Item) => {
      list.push({
        id: item.id,
        title: item.title,
        tagList: item.tagList,
        rate:
          item.acceptedNum == 0 ? 0 : (item.acceptedNum / item.submitNum) * 100,
        contestName: item.contestName,
      });
    });
  }
};
const doReset = async () => {
  Object.keys(searchParams).forEach((key) => {
    searchParams[key] = "";
  });
  getQuestionList();
};
onMounted(() => {
  getQuestionList();
});
</script>
<style scoped>
.home .header {
  margin-left: 20px;
  font-size: 20px;
  padding-top: 10px;
}
.arco-col-8 {
  text-align: center;
}
.home {
  height: 100vh;
  margin: 40px 150px 0;
  background-color: white;
}
</style>
