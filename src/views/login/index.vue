<template>
  <div class="login-wrap">
    <h2>This is Login</h2>
    <a-form-model :model="form">
      <a-form-model-item label="Username">
        <a-input v-model="form.username" />
      </a-form-model-item>
      <a-form-model-item label="Password">
        <a-input v-model="form.password" />
      </a-form-model-item>
    </a-form-model>
    <a-button @click="doSignIn">SIGN IN</a-button>
  </div>
</template>

<script>
import { LOGIN_REQUEST } from '../../store/types';
export default {
  name: "login",
  data() {
    return {
      form: {
        username: "",
        password: "",
      }
    }
  },
  methods: {
    doSignIn() {
      this.$store.dispatch(LOGIN_REQUEST, {
        username: this.form.username,
        password: this.form.password
      })
    }
  }
};
</script>

<style lang="less" scoped></style>
