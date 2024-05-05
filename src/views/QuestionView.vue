<template>
  <div id="question">
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
        <a-typography-paragraph>
          <div :style="{ display: 'flex' }">
            <a-card
              :style="{ width: '100%', height: '100vh' }"
              :title="data.question.title"
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
          <COdeEditor
            :lang="lang"
            :value="code"
            :handle-change="handelChange"
          ></COdeEditor>
        </a-typography-paragraph>
      </template>
    </a-split>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
import { Message } from "@arco-design/web-vue";
import { onMounted } from "vue";
import { ref, reactive } from "vue";
import COdeEditor from "@/components/CodeEditor.vue";
import MdViewer from "@/components/MdViewer.vue";
import {
  QuestionVO,
  QuestionControllerService,
} from "@/api/roj-apis/questionApi";
import { JudgeControllerService } from "@/api/roj-apis/judgeApi";
const languages = [
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  // { value: "c", label: "C" },
];
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
const router = useRouter();
const getQuestion = async () => {
  const id = router.currentRoute.value.query.id;
  const resp = await QuestionControllerService.getQuestionVoByIdUsingGet(id);

  if (resp.code === 0) {
    data.question = { ...(resp.data as QuestionVO) };
  } else {
    Message.error(resp.message as string);
  }
};
const handelChange = (v: string) => {
  code.value = v;
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
onMounted(() => {
  getQuestion();
});
</script>
