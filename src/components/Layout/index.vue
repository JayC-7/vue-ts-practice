<template>
  <div class="basic-layout">
    <a-layout>
      <a-layout-header>
        <div class="logo">XXX</div>
        <user-profile></user-profile>
      </a-layout-header>
      <a-layout class="main-layout">
        <a-layout-sider 
          theme="light" 
          width="256px" 
          v-model="collapsed" 
          collapsible 
          :collapsedWidth="64"
        >
          <template :slot="trigger">
            <a-icon :type="collapse ? 'menu-unfold' : 'menu-fold'"></a-icon>
          </template>
          <side-nav :collapsed="collapsed" @onCollapse="() => collapsed = !collapsed"></side-nav>
        </a-layout-sider>
        <a-layout-content>
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import SideNav from "../SideNav/index.vue";
import UserProfile from "../TopBar/UserProfile.vue";
import { Base64 } from "js-base64";

export default {
  name: "layout",
  components: {
    SideNav, UserProfile
  },
  data() {
    return {
      collapsed: false
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../style/common.less";

.basic-layout {
  height: 100vh;
  overflow: hidden;

  /deep/ .ant-layout-header {
    display: flex;
    justify-content: space-between;
    padding: 0 24px;
    z-index: 1;
    background: @header-bg;
    .box_shadow_bottom();
  }

  /deep/ .ant-layout {
    height: 100%;
  }

  /deep/ .ant-layout-sider-trigger {
    .box_border_right();
  }

  .logo {
    font-size: @logo-font-size;
    font-weight: @font-weight-bold;
  }

  .main-layout {
    padding-top: 8px;
  }
}
</style>

<style lang="less"></style>
