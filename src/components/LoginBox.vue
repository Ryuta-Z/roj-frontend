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
import { UserControllerService } from "@/api/roj-apis/userApi";
import { Message } from "@arco-design/web-vue";
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
      const resp = await UserControllerService.userLoginUsingPost({
        userAccount: form.name,
        userPassword: form.passwd,
      });
      console.log(resp);
      // if (resp.code === 0) {
      //   store.dispatch("user/setLoginUser", {
      //     name: resp.data.userName,
      //     access: resp.data.userRole,
      //   });
      //   Message.success("登录成功");
      //   loginVisible.value = false;
      // } else Message.error(resp.message);
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
