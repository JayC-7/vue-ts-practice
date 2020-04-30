/** * 1. 区分外链跟页面路由 * 2. 目前只支持二级菜单（a-sub-menu存在bug） * 3.
逻辑调通 * */
<template>
  <a-menu ref="menu" mode="inline" theme="light">
    <side-nav-item
      v-for="data in menus"
      :data="data"
      :key="data.name || data.path"
      :parent="$refs.menu"
    ></side-nav-item>
  </a-menu>
</template>

<script>
import { mapGetters } from "vuex";
import SideNavItem from "./item.vue";
export default {
  name: "sideNav",
  components: {
    SideNavItem,
  },
  data() {
    return {};
  },
  mounted() {
    console.log("this.props", this.$attrs);
  },
  methods: {},
  computed: {
    ...mapGetters({
      menus: "asyncRoutes",
    }),
  },
};
</script>

<style lang="scss" scoped></style>
