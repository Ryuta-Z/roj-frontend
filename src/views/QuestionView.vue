<template>
  <div class="question-view">
    <a-split
      :style="{
        height: '100vh',
        width: '100%',
        minWidth: '500px',
        border: '1px solid var(--color-border)',
      }"
      v-model:size="size"
      min="80px"
    >
      <template #first>
        <a-tabs default-active-key="1">
          <a-tab-pane key="1" title="题目描述">
            <a-typography-paragraph>
              <div :style="{ display: 'flex' }">
                <a-card
                  :style="{ width: '100%', height: '100vh' }"
                  :title="data.question.title"
                  :bordered="false"
                >
                  <template #extra>
                    <a-space wrap style="margin-left: 10px">
                      <a-tag
                        v-for="(tag, index) of data.question.tagList"
                        :key="index"
                        color="green"
                        >{{ tag }}</a-tag
                      >
                    </a-space>
                  </template>
                  <a-descriptions
                    :column="{ xs: 1, md: 3, lg: 4 }"
                    v-if="data.question.judgeConfig != null"
                  >
                    <a-descriptions-item label="时间限制">
                      <a-tag>{{ data.question.judgeConfig.timeLimit }}</a-tag>
                    </a-descriptions-item>
                    <a-descriptions-item label="内存限制">
                      <a-tag>{{ data.question.judgeConfig.memoryLimit }}</a-tag>
                    </a-descriptions-item>
                    <a-descriptions-item label="堆栈限制">
                      <a-tag>{{ data.question.judgeConfig.stackLimit }}</a-tag>
                    </a-descriptions-item>
                  </a-descriptions>
                  <MdViewer :value="data.question.content"> </MdViewer>
                </a-card>
              </div>
            </a-typography-paragraph>
          </a-tab-pane>
          <a-tab-pane key="2" title="题解">
            <a-button type="primary" style="margin-left: 20px" @click="addPost">
              <template #icon>
                <IconEdit></IconEdit>
              </template>
              编写题解
            </a-button>
            <a-card
              v-for="(post, index) in posts"
              :title="post.userName + '发布的题解'"
              v-bind:key="index"
              :bordered="false"
            >
              <template #extra>
                <a-space>
                  <div>{{ post.createTime }}</div>
                  <a-button
                    type="text"
                    :disabled="editable(index)"
                    @click="revisionPost(index)"
                  >
                    <template #icon>
                      <IconEdit></IconEdit>
                    </template>
                    修改
                  </a-button>
                </a-space>
              </template>
              <MdViewer :value="post.content"> </MdViewer>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="3" title="数据统计">
            <QuestionPieChart
              :value="router.currentRoute.value.query.id as string"
            />
            <LanguagePieChart
              :value="router.currentRoute.value.query.id as string"
            />
            <TimeBarChart
              :value="router.currentRoute.value.query.id as string"
            />
          </a-tab-pane>
        </a-tabs>
      </template>
      <template #second>
        <a-typography-paragraph>
          <a-row class="grid-demo" style="margin-bottom: 16px">
            <a-col flex="100px">
              <a-select
                v-model="lang"
                :style="{ width: '320px' }"
                placeholder="Select"
              >
                <a-option
                  v-for="item of languages"
                  :value="item.value"
                  :label="item.label"
                  :key="item.value"
                />
              </a-select>
            </a-col>
            <a-col flex="auto"> </a-col>
            <a-col flex="100px">
              <a-button type="primary" @click="doCodeSubmit">提交</a-button>
            </a-col>
          </a-row>
          <CodeEditor
            :lang="lang"
            :value="code"
            :handle-change="handelChange"
          ></CodeEditor>
        </a-typography-paragraph>
      </template>
    </a-split>
    <a-modal v-model:visible="visible" title="编辑题解" @ok="handleOk">
      <MdEditor :value="mypost" :handle-change="doEdit" />
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
import { Message } from "@arco-design/web-vue";
import { onMounted } from "vue";
import { ref, reactive } from "vue";
import CodeEditor from "@/components/CodeEditor.vue";
import MdViewer from "@/components/MdViewer.vue";
import { IconEdit } from "@arco-design/web-vue/es/icon";
import MdEditor from "@/components/MdEditor.vue";
import QuestionPieChart from "@/components/QuestionPieChart.vue";
import LanguagePieChart from "@/components/LanguagePieChart.vue";
import TimeBarChart from "@/components/TimeBarChart.vue";
import {
  QuestionVO,
  QuestionControllerService,
} from "@/api/roj-apis/questionApi";
import { JudgeControllerService } from "@/api/roj-apis/judgeApi";
import { useStore } from "vuex";
import {
  PostControllerService,
  PostVO,
  PostAddRequest,
} from "@/api/roj-apis/postApi";
const languages = [
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "c", label: "C" },
];
const mypost = ref("");
const swi = ref({
  state: true,
  index: 0,
});
const visible = ref(false);
const lang = ref("java");
const size = ref("0.5");
const code = ref("");
const data = reactive({
  question: {
    id: "",
    title: "",
    content: "",
    tagList: [],
    submitNum: 0,
    acceptedNum: 0,
    judgeConfig: { memoryLimit: 0, timeLimit: 0, stackLimit: 0 },
  },
});
const posts = reactive([
  {
    id: "",
    userId: "",
    userName: "ryuta",
    content: '```java\nSystem.out.println("HelloWorld")\n```',
    createTime: "2024.5.7 11:16:00",
  },
  {
    id: "",
    userId: "",
    userName: "ryuta",
    content: '```java\nSystem.out.println("HelloWorld")\n```',
    createTime: "2024.5.7 11:16:00",
  },
]);
const router = useRouter();
const getQuestion = async () => {
  const id = router.currentRoute.value.query.id;
  const resp = await QuestionControllerService.getQuestionVoByIdUsingGet(id);

  if (resp.code === 0) {
    data.question = { ...(resp.data as QuestionVO) };
    getPost();
  } else {
    Message.error(resp.message as string);
  }
};
const handelChange = (v: string) => {
  code.value = v;
};
const store = useStore();
const editable = (index: number) => {
  return posts[index].userId != store.state.user.loginUser.id;
};
const doEdit = (v: string) => {
  mypost.value = v;
};
const handleOk = async () => {
  if (swi.value.state) {
    const resp = await PostControllerService.addPostUsingPost({
      content: mypost.value,
      questionid: data.question.id,
      questionname: data.question.title,
    });
    if (resp.code == 0) {
      Message.success("提交成功,待审核...");
    } else Message.error(resp.message!);
  } else {
    const resp = await PostControllerService.updatePostUsingPost({
      content: mypost.value,
      ispublic: 0,
      id: posts[swi.value.index].id,
    });
    if (resp.code == 0) {
      Message.success("修改成功!");
    } else Message.error(resp.message!);
    visible.value;
    swi.value.state = true;
  }
};
const revisionPost = (index: number) => {
  swi.value.state = false;
  swi.value.index = index;
  mypost.value = posts[index].content;
  visible.value = true;
};
const doCodeSubmit = async () => {
  const resp = await JudgeControllerService.doSubmitUsingPost({
    code: code.value,
    language: lang.value,
    questionId: router.currentRoute.value.query.id,
  });
  if (resp.code == 0) {
    Message.success("提交成功!");
  } else {
    Message.error(resp.message);
  }
};
const addPost = () => {
  visible.value = true;
};
const getPost = async () => {
  const resp = await PostControllerService.listPostVoByPageUsingPost({
    questionid: data.question.id,
  });
  if (resp.code == 0) {
    posts.length = 0;
    const postList = resp.data.records;
    if (postList != null)
      postList.forEach((source: PostVO) => {
        posts.push({
          userId: source.userid!,
          userName: source.username!,
          content: source.content!,
          createTime: source.createtime!,
          id: source.id!,
        });
      });
  } else Message.error(resp.message!);
};
onMounted(() => {
  getQuestion();
});
</script>
<style scoped>
.question-view {
  margin: 40px 40px 0;
  background-color: white;
}
</style>
