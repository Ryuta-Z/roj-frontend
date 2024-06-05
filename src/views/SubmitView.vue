<template>
  <div class="submit-view">
    <div class="header">提交记录</div>
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
            v-model="searchParams.questionId"
          />
        </a-space>
      </a-col>
      <a-col :span="8" class="title_id">
        <a-space>
          <div>用户编号</div>
          <a-input
            placeholder="请输入用户编号"
            :max-length="20"
            allow-clear
            show-word-limit
            v-model="searchParams.userId"
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
          <div>语言</div>
          <a-select
            v-model="searchParams.lang"
            placeholder="请选择语言"
            allow-search
          >
            <a-option value="java">Java</a-option>
            <a-option value="cpp">C++</a-option>
            <a-option value="c">C</a-option>
          </a-select>
        </a-space>
      </a-col>
      <a-col :span="8" class="contest-name">
        <a-space>
          <div>状态</div>
          <a-select
            placeholder="请选择状态"
            allow-search
            v-model="searchParams.status"
          >
            <a-option>Accept</a-option>
            <a-option>Compile Error</a-option>
            <a-option>Runtime Error</a-option>
            <a-option>Time Limit Exceed</a-option>
            <a-option>Memory Limit Exceed</a-option>
          </a-select>
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
    <a-table
      :columns="columns"
      :data="list"
      :sticky-header="100"
      style="height: 500px"
    >
      <template #info="{ record }">
        <a-space wrap>
          <a-tag :color="getColor(record)">{{
            record.judgeInfo.message == null
              ? "System Error"
              : record.judgeInfo.message
          }}</a-tag>
        </a-space>
      </template>
      <template #time="{ record }">
        <a-statistic
          :value="
            record.judgeInfo.time == null
              ? 0
              : Number.parseInt(record.judgeInfo.time)
          "
          show-group-separator
        >
          <template #suffix>MS</template>
        </a-statistic>
      </template>
    </a-table>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import Message from "@arco-design/web-vue/es/message";
import { JudgeControllerService } from "@/api/roj-apis/judgeApi";
const pageIndex = {
  current: 0,
  pageSize: 20,
};
const columns = [
  {
    title: "题目ID",
    dataIndex: "questionId",
  },
  {
    title: "用户ID",
    dataIndex: "userId",
  },
  {
    title: "语言",
    dataIndex: "language",
  },
  {
    title: "判题信息",
    slotName: "info",
  },
  {
    title: "执行耗时",
    slotName: "time",
  },
  {
    title: "提交时间",
    dataIndex: "createTime",
  },
];
const list = reactive([
  {
    questionId: "1744989463014141953",
    userId: "1742833268589338626",
    judgeInfo: {
      time: 0,
      message: "",
      memory: "",
    },
    createTime: "2024-01-10T08:44:35.000+00:00",
    language: "java",
  },
]);
interface Item {
  id: string;
  language: string;
  code: string;
  judgeInfo: {
    message: string;
    time: number;
    memory: string;
  };
  questionId: string;
  userId: string;
  createTime: string;
  updateTime: string;
}
const searchParams = reactive({
  questionId: "",
  userId: "",
  status: "",
  lang: "",
});
const getSubmitList = async () => {
  const resp = await JudgeControllerService.listQuestionSubmitByPageUsingPost({
    current: pageIndex.current,
    pageSize: pageIndex.pageSize,
  });
  if (resp.code != 0) {
    Message.error(resp.message);
  } else {
    const questionList = resp.data.records;
    list.length = 0;
    questionList.forEach((item: Item) => {
      list.push({
        questionId: item.questionId,
        userId: item.userId,
        judgeInfo: item.judgeInfo,
        createTime: new Date(item.createTime).toLocaleString(),
        language: item.language,
      });
    });
  }
};
const getColor = (item: Item) => {
  if (item.judgeInfo != null && item.judgeInfo.message != null) {
    if (item.judgeInfo.message != "Accepted") {
      return "red";
    } else {
      return "green";
    }
  }
  return undefined;
};
const doSearch = async () => {
  const resp = await JudgeControllerService.listQuestionSubmitByPageUsingPost({
    language: searchParams.lang,
    userId: searchParams.userId,
    questionId: searchParams.questionId,
    status: searchParams.status,
  });
  if (resp.code != 0) {
    Message.error(resp.message);
  } else {
    const questionList = resp.data.records;
    list.length = 0;
    questionList.forEach((item: Item) => {
      list.push({
        questionId: item.questionId,
        userId: item.userId,
        judgeInfo: item.judgeInfo,
        createTime: new Date(item.createTime).toLocaleString(),
        language: item.language,
      });
    });
  }
};
const doReset = async () => {
  Object.keys(searchParams).forEach((key) => {
    searchParams[key] = "";
  });
  getSubmitList();
};
onMounted(() => {
  getSubmitList();
});
</script>
<style scoped>
.submit-view .header {
  margin-left: 20px;
  font-size: 20px;
  padding-top: 10px;
}
.arco-col-8 {
  text-align: center;
}
.submit-view {
  height: 100vh;
  margin: 40px 150px 0;
  background-color: white;
}
</style>
