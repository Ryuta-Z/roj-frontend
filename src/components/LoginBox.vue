<template>
  <a-modal
    v-model:visible="loginVisible"
    title="Login"
    @cancel="handleCancel"
    @before-ok="handleBeforeOk"
  >
    <a-form :model="form">
      <a-form-item field="name" label="Name">
        <a-input v-model="form.name" />
      </a-form-item>
      <a-form-item field="passwd" label="Passwd">
        <a-input type="password" v-model="form.passwd" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
import { reactive, ref } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const loginVisible = ref(false);
    const store = useStore();
    const form = reactive({
      name: "",
      passwd: "",
    });

    const handleClick = () => {
      loginVisible.value = true;
    };
    //请求登录api
    const handleBeforeOk = async () => {
      store.dispatch("user/setLoginUser", {
        name: form.name,
        passwd: form.passwd,
      });
      loginVisible.value = false;
    };
    const handleCancel = () => {
      loginVisible.value = false;
    };

    return {
      loginVisible,
      form,
      handleClick,
      handleBeforeOk,
      handleCancel,
    };
  },
};
</script>
