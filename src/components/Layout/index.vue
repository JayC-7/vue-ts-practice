<template>
  <div>
    <a-layout>
      <a-layout-header></a-layout-header>
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

export default {
  name: "layout",
  components: {
    SideNav,
  },
};
</script>

<style lang="scss" scoped></style>
