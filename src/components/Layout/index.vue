<template>
  <div class="basic-layout">
    <a-layout>
      <a-layout-header>
        <div class="logo">XXX</div>
      </a-layout-header>
      <a-layout>
        <a-layout-sider theme="light">
          <side-nav></side-nav>
        </a-layout-sider>
        <a-layout-content>
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer></a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import SideNav from "../SideNav/index.vue";
import { Base64 } from "js-base64";

export default {
  name: "layout",
  components: {
    SideNav,
  },
};
</script>

<style lang="scss" scoped>
.basic-layout {
  height: 100vh;
  overflow: hidden;
}
</style>

<style lang="scss">
.ant-layout {
  height: 100%;
}
</style>
