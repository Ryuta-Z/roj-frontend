<template>
  <div id="createQuestion">
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
          <MdEditor
            class="contentBox"
            :value="form.content"
            :handle-change="doEdit"
          ></MdEditor>
        </a-typography-paragraph>
      </template>
      <template #second>
        <a-typography-paragraph>
          <a-form
            :model="form"
            layout="vertical"
            class="formBox"
            @submit="doSubmit"
          >
            <a-form-item field="title" label="标题" :required="true">
              <a-input v-model="form.title" placeholder="请输入标题" />
            </a-form-item>
            <a-form-item
              v-for="(judgeCase, index) of form.judgeCases"
              :field="`judgeCases[${index}].`"
              :label="`判题用例-${index}`"
              :key="index"
            >
              <a-input v-model="judgeCase.input" placeholder="输入" />
              <a-input v-model="judgeCase.output" placeholder="输出" />
              <a-button
                @click="handleDelete(index)"
                :style="{ marginLeft: '10px' }"
                >移除</a-button
              >
            </a-form-item>
            <a-form-item>
              <a-button @click="addJudgeCase">增加测试用例</a-button>
            </a-form-item>
            <a-form-item
              :required="true"
              :field="`judgeConfig`"
              label="判题配置"
            >
              <a-space direction="vertical" size="mini">
                <a-space direction="horizontal" size="mini"
                  ><a-slider
                    class="config"
                    v-model="form.judgeConfig.timeLimit"
                    :default-value="0"
                    :style="{ width: '200px' }"
                    show-input
                  /><span>时间限制:MS</span>
                </a-space>
                <a-space direction="horizontal" size="mini">
                  <a-slider
                    class="config"
                    v-model="form.judgeConfig.memoryLimit"
                    :default-value="0"
                    :style="{ width: '200px' }"
                    show-input
                  /><span>内存限制:MB</span>
                </a-space>
                <a-space direction="horizontal" size="mini">
                  <a-slider
                    class="config"
                    v-model="form.judgeConfig.stackLimit"
                    :default-value="0"
                    :style="{ width: '200px' }"
                    show-input
                  /><span>堆栈限制:MB</span>
                </a-space>
              </a-space>
            </a-form-item>
            <a-form-item field="tags" label="标签">
              <a-space wrap>
                <a-tag
                  v-for="(tag, index) of form.tags"
                  :key="tag"
                  :closable="index !== 0"
                  @close="handleRemoveTag(tag)"
                >
                  {{ tag }}
                </a-tag>

                <a-input
                  v-if="showInput"
                  ref="inputRef"
                  :style="{ width: '90px' }"
                  size="mini"
                  v-model.trim="inputVal"
                  @keyup.enter="handleAddTag"
                  @blur="handleAddTag"
                />
                <a-tag
                  v-else
                  :style="{
                    width: '90px',
                    backgroundColor: 'var(--color-fill-2)',
                    border: '1px dashed var(--color-fill-3)',
                    cursor: 'pointer',
                  }"
                  @click="handleEditTag"
                >
                  <template #icon>
                    <icon-plus />
                  </template>
                  Add Tag
                </a-tag>
              </a-space>
            </a-form-item>
            <a-form-item>
              <a-button
                class="submitButton"
                type="primary"
                size="large"
                html-type="submit"
                >提交</a-button
              >
            </a-form-item>
          </a-form>
        </a-typography-paragraph>
      </template>
    </a-split>
  </div>
</template>
<script setup lang="ts">
import { nextTick, reactive, ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import { QuestionControllerService } from "@/api/services/QuestionControllerService";
import { useStore } from "vuex";
import { checkAccess } from "@/access/AccessCheck";
import Access from "@/access/Access";
import { QuestionAddRequest } from "@/api/models/QuestionAddRequest";
import { Message } from "@arco-design/web-vue";
import { useRouter } from "vue-router";
import user from "@/store/user";
const router = useRouter();
const size = ref(0.8);
const inputRef = ref();
const showInput = ref(false);
const inputVal = ref("");
const form = reactive({
  anwser: "",
  content: "",
  judgeCases: [
    {
      input: "",
      output: "",
    },
  ],
  judgeConfig: {
    memoryLimit: 0,
    stackLimit: 0,
    timeLimit: 0,
  },
  tags: [],
  title: "",
});
const doEdit = (v: string) => {
  form.content = v;
};
const addJudgeCase = () => {
  form.judgeCases.push({
    input: "",
    output: "",
  });
};
const handleDelete = (index: number) => {
  form.judgeCases.splice(index, 1);
};
const handleEditTag = () => {
  showInput.value = true;

  nextTick(() => {
    if (inputRef.value) {
      inputRef.value.focus();
    }
  });
};
const handleAddTag = () => {
  if (inputVal.value) {
    form.tags.push(inputVal.value);
    inputVal.value = "";
  }
  showInput.value = false;
};
const handleRemoveTag = (key: string) => {
  form.tags = form.tags.filter((tag: string) => tag !== key);
};
const store = useStore();
const doSubmit = async (data: FormData) => {
  if (checkAccess(store.state.user.loginUser, Access.USER)) {
    const resp = await QuestionControllerService.addQuestionUsingPost(
      form as QuestionAddRequest
    );
    if (resp.code == 0) {
      Message.success("提交成功");
      router.push({
        path: "/admin",
      });
    } else {
      Message.error(resp.message);
    }
  } else {
    Message.warning("请先登录!");
  }
};
</script>
<style scoped>
.formBox {
  margin-left: 16px;
  margin-right: 16px;
}
.contentBox {
  margin-left: 30px;
  margin-right: 30px;
}
.submitButton {
  width: 100%;
  position: sticky;
  bottom: 0;
}
</style>
