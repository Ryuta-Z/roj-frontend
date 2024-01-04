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
import { UserControllerService } from "@/api/services/UserControllerService";
import { Message } from "@arco-design/web-vue";
import { useRouter } from "vue-router";
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
    const router = useRouter();
    //请求登录api
    const handleBeforeOk = async () => {
      const resp = await UserControllerService.userLoginUsingPost({
        userAccount: form.name,
        userPassword: form.passwd,
      });
      if (resp.code === 0) {
        store.dispatch("user/setLoginUser", {
          name: resp.data.userName,
          access: resp.data.userRole,
        });
        Message.success("登录成功");
        loginVisible.value = false;
        return true;
      } else Message.error(resp.message);
      return false;
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
