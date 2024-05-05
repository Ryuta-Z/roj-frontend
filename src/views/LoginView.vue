<template>
  <div id="loginView">
    <a-space direction="vertical" fill size="large">
      <div class="logo">Wellcome,ACMer!!!</div>
      <a-tabs type="capsule" size="medium">
        <a-tab-pane key="1" title="login">
          <a-form
            ref="formRef"
            :rules="rules"
            :model="loginForm"
            class="formbox"
            @submit="doLogin"
          >
            <a-form-item field="name" label="用户名" validate-trigger="blur">
              <a-input v-model="loginForm.name" placeholder="请输入用户名" />
            </a-form-item>
            <a-form-item field="password" label="密码" validate-trigger="blur">
              <a-input-password
                v-model="loginForm.password"
                placeholder="请输入密码"
              />
            </a-form-item>
            <a-form-item>
              <a-button html-type="submit" type="primary" style="width: 100%"
                >登录</a-button
              >
            </a-form-item>
          </a-form>
        </a-tab-pane>
        <a-tab-pane key="2" title="register">
          <a-form
            ref="formRef"
            :rules="rules"
            :model="registerForm"
            class="formbox"
            @submit="doRegister"
          >
            <a-form-item field="name" label="用户名" validate-trigger="blur">
              <a-input v-model="registerForm.name" placeholder="请输入用户名" />
            </a-form-item>
            <a-form-item field="password" label="密码" validate-trigger="blur">
              <a-input-password
                v-model="registerForm.password"
                placeholder="请输入密码"
              />
            </a-form-item>
            <a-form-item
              field="password2"
              label="确认密码"
              validate-trigger="blur"
            >
              <a-input-password
                v-model="registerForm.password2"
                placeholder="再次输入密码"
              />
            </a-form-item>
            <a-form-item>
              <a-button html-type="submit" type="primary" style="width: 100%"
                >注册</a-button
              >
            </a-form-item>
          </a-form>
        </a-tab-pane>
      </a-tabs>
    </a-space>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService } from "@/api/roj-apis/userApi/services/UserControllerService";
import { Message } from "@arco-design/web-vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const store = useStore();
const loginForm = reactive({
  name: "",
  password: "",
});
const registerForm = reactive({
  name: "",
  password: "",
  password2: "",
});
const rules = {
  name: [
    {
      required: true,
      message: "用户名必须",
    },
  ],
  password: [
    {
      required: true,
      message: "密码必须",
      validator: (value: string, cb: any) => {
        if (value.length < 8) {
          cb("密码不低于8位");
        } else {
          cb();
        }
      },
    },
  ],
  password2: [
    {
      required: true,
      message: "密码必须",
    },
    {
      validator: (value: string, cb: any) => {
        if (value !== registerForm.password) {
          cb("两次输入不一致");
        } else {
          cb();
        }
      },
    },
  ],
};
const router = useRouter();
const doLogin = async () => {
  const resp = await UserControllerService.userLoginUsingPost({
    userAccount: loginForm.name,
    userPassword: loginForm.password,
  });
  if (resp.code != 0) {
    Message.error(resp.message);
  } else {
    store.dispatch("user/setLoginUser", {
      name: resp.data.userName,
      access: resp.data.userRole,
    });
    location.reload();
  }
};
const doRegister = async () => {
  const resp = await UserControllerService.userRegisterUsingPost({
    userAccount: registerForm.name,
    userPassword: registerForm.password,
    checkPassword: registerForm.password2,
  });
  if (resp.code != 0) {
    Message.error(resp.message);
  } else {
    Message.success("注册成功");
  }
};
</script>
<style>
#loginView {
  width: 600px;
  height: 500px;
  margin: 40px auto auto auto;
  align-items: center;
  background-color: white;
  display: flex;
  box-shadow: 5px 5px 5px #00000014, 5px -5px 5px #00000014,
    -5px 5px 5px #00000014, -5px -5px 5px #00000014;
}
.formbox {
  align-items: center;
}
.logo {
  color: aqua;
  text-align: center;
  font-size: 40px;
  font-style: italic;
}
</style>
