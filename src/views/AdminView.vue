<template>
  <div class="questionAdmin">
    <a-card class="submitCard" title="我创建的题目" hoverable>
      <template #extra>
        <a-input-search
          :style="{ width: '320px' }"
          placeholder="输入标题、标签或ID查询"
          search-button
          @search="doSerch"
        >
          <template #button-icon>
            <icon-search />
          </template>
          <template #button-default> Search </template>
        </a-input-search>
        <a-button @click="cancelSearch">取消</a-button>
      </template>
      <a-table :columns="columns" :data="list" :sticky-header="100">
        <template #optional="{ record }">
          <a-space direction="horizontal">
            <a-button @click="doEdit(record)" type="primary">编辑</a-button>
            <a-button @click="doDelete(record)" type="primary" status="danger"
              >删除</a-button
            >
          </a-space>
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
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { QuestionControllerService } from "@/api/services/QuestionControllerService";
import { Message } from "@arco-design/web-vue";
import { useRouter } from "vue-router";
const router = useRouter();
const pageIndex = {
  current: 0,
  pageSize: 100,
};
const columns = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "标题",
    dataIndex: "title",
  },
  {
    title: "标签",
    slotName: "tags",
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
  },
]);
interface Item {
  id: string;
  title: string;
  tagList: [];
  acceptedNum: number;
  submitNum: number;
}
const getQuestionList = async () => {
  const resp = await QuestionControllerService.listMyQuestionVoByPageUsingPost({
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
      });
    });
  }
};
const doEdit = (question: Item) => {
  router.push({
    path: "/editQuestion",
    query: { id: question.id },
  });
};
const doDelete = async (question: Item) => {
  const resp = await QuestionControllerService.deleteQuestionUsingPost({
    id: question.id,
  });
  if (resp.code != 0) {
    Message.error(resp.message);
  } else {
    Message.success("删除成功");
    getQuestionList();
  }
};
const doSerch = async (value: string) => {
  const resp = await QuestionControllerService.listMyQuestionVoByPageUsingPost({
    id: !isNaN(parseFloat(value)) ? value : null,
    title: value,
    tags: [value],
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
      });
    });
  }
};
const cancelSearch = () => {
  getQuestionList();
};
onMounted(() => {
  // getQuestionList();
});
</script>
<style>
.arco-table {
  padding-left: 5%;
  padding-right: 5%;
}
</style>
