/** 
* 1. 区分外链跟页面路由 
* 2. 目前只支持二级菜单（a-sub-menu存在bug，若要支持递归则需将subMenu抽象定义函数式组件，例：https://www.antdv.com/components/menu-cn/#components-menu-demo-single-file-recursive-menu）
* */
<template>
  <div class="side-nav">
    <!-- menu -->
    <a-menu mode="inline" theme="light">
      <template v-for="data in dataList">
        <!-- 一级菜单 -->
        <a-menu-item v-if="!data.children" :key="data.path">
          <router-link :to="data.path">
            <a-icon
              v-if="data.meta && data.meta.icon"
              :type="data.meta.icon"
            ></a-icon>
            <span>{{ data.meta && data.meta.title }}</span>
          </router-link>
        </a-menu-item>

        <!-- 二级菜单 -->
        <a-sub-menu v-else :key="data.path">
          <span slot="title">
            <a-icon
              v-if="data.meta && data.meta.icon"
              :type="data.meta.icon"
            ></a-icon>
            <span>{{ data.meta && data.meta.title }}</span>
          </span>
          <template v-for="subData in data.children">
            <a-menu-item :key="subData.path">
              <router-link :to="subData.path">
                <a-icon
                  v-if="subData.meta && subData.meta.icon"
                  :type="subData.meta.icon"
                ></a-icon>
                <a-icon
                  v-else-if="data.meta && data.meta.icon"
                  :type="data.meta.icon"
                  style="opacity: 0;"
                ></a-icon>
                <span>{{ subData.meta && subData.meta.title }}</span>
              </router-link>
            </a-menu-item>
          </template>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "sideNav",
  data() {
    return {
      collapsed: false,
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
        if (item.path !== "") {
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

    toggleCollapsed() {
      this.$emit("onCollapse");
    },
  },
  computed: {
    ...mapGetters({
      menus: "asyncRoutes",
    }),
  },
};
</script>

<style lang="less" scoped>
.side-nav {
  position: relative;
  width: 256px;
  height: 100%;
  text-align: left;
  /deep/ .ant-menu-inline-collapsed > .ant-menu-item,
  /deep/
    .ant-menu-inline-collapsed
    > .ant-menu-item-group
    > .ant-menu-item-group-list
    > .ant-menu-item,
  /deep/
    .ant-menu-inline-collapsed
    > .ant-menu-item-group
    > .ant-menu-item-group-list
    > .ant-menu-submenu
    > .ant-menu-submenu-title,
  /deep/
    .ant-menu-inline-collapsed
    > .ant-menu-submenu
    > .ant-menu-submenu-title {
    padding: 0 24px !important;
  }
}
</style>

<style lang="less">
.ant-menu {
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
.ant-menu-inline-collapsed {
  width: 64px !important;
}
</style>
