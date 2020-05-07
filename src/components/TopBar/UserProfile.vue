<template>
  <div class="user-profile">
    <a-dropdown :trigger="['click']">
      <a-avatar>{{ userProfile.username }}</a-avatar>
      <a-menu slot="overlay" class="user-profile-dropdown">
        <a-menu-item>Log Out</a-menu-item>
        <a-menu-item>Setting</a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "userProfile",
  computed: {
    ...mapGetters({
      userProfile: "userProfile",
    }),
  },
};
</script>

<style lang="less" scoped>
.user-profile {
  /deep/ .ant-avatar {
    cursor: pointer;
  }
}
</style>

<style lang="less">
.user-profile-dropdown {
  min-width: 80px;
}
</style>
