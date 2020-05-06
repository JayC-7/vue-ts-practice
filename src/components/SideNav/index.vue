/** * 1. 区分外链跟页面路由 * 2. 目前只支持二级菜单（a-sub-menu存在bug） * */
<template>
  <a-menu mode="inline" theme="light" style="width: 256px;text-align: left;">
    <!-- <side-nav-item
      v-for="data in menus"
      :data="data"
      :key="data.name || data.path"
      :parent="$refs.menu"
    ></side-nav-item> -->
    <template v-for="data in dataList">
      <!-- 一级菜单 -->
      <a-menu-item v-if="!data.children" :key="data.name || data.path">
        <router-link :to="data.path">
          <a-icon v-if="data.meta && data.meta.icon" :type="data.meta.icon"></a-icon>
          {{ data.meta && data.meta.title }}
        </router-link>
      </a-menu-item>

      <!-- 二级菜单 -->
      <a-sub-menu v-else :key="data.name || data.path">
        <span slot="title">
          <a-icon v-if="data.meta && data.meta.icon" :type="data.meta.icon"></a-icon>
          {{ data.meta && data.meta.title }}
        </span>
        <template v-for="subData in data.children">
          <a-menu-item :key="subData.name || subData.path">
            <router-link :to="subData.path">
              <a-icon v-if="subData.meta && subData.meta.icon" :type="subData.meta.icon"></a-icon>
              <a-icon v-else-if="data.meta && data.meta.icon" :type="data.meta.icon" style="opacity: 0;"></a-icon>
              {{ subData.meta && subData.meta.title }}
            </router-link>
          </a-menu-item>
        </template>
      </a-sub-menu>

    </template>
  </a-menu>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "sideNav",
  data() {
    return {
      dataItem: {},
      dataList: [], // dataList若为计算属性，无法自动更新模板
    };
  },
  mounted() {
    this.getMenus();
  },
  methods: {
    getMenus() {
      const list = [];
      this.menus.forEach((item) => {
        list.push(this.handleNavItem(item));
      });
      this.dataList = list;
    },
    handleNavItem(data) {
      let filtered = [];
      const temp = { ...data };

      // 过滤出hidden为true的menus
      if (data.children.length > 0) {
        filtered = data.children.filter((item) => !item.hidden);
      }

      // 若children只有一项，默认为一级菜单
      if (filtered.length === 1) {
        const item = temp.children[0];
        if( item.path !== "" ) {
          temp.path = `${temp.path}/${item.path}`.replace("//", "/");
        }
        temp.meta = item.meta;
        temp.children = null;
        temp.name = item.name;
      } else if (filtered.length > 0) {
        // 拼接完整children path
        temp.children.forEach((item) => {
          item.path = `${temp.path}/${item.path}`.replace("//", "/");
        });
      }

      return temp;
    },
  },
  computed: {
    ...mapGetters({
      menus: "asyncRoutes",
    }),
  },
};
</script>

<style lang="scss">
.ant-menu {
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
