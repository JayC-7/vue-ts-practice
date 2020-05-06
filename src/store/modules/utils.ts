import { 
  GET_MENUS_REQUEST, 
  GET_MENUS_SUCCESS, 
  GET_MENUS_FAILURE,
  LOADING_START,
  LOADING_END,
} from "../types";
import { getMenus } from "../../api/menus";
import messages from "../../utils/messages";
import { RouteConfig } from 'vue-router';
import { constantRoutes } from '@/router';

const state = {
  loading: false,
  permissions: [],
  asyncRoutes: [],
  routes: [],
};

const mutations = {
  GET_MENUS_REQUEST(state: any) {
    state.loading = true;
  },
  GET_MENUS_SUCCESS(state: any, payload: any) {
    const { permissions } = payload;
    state.permissions = permissions;
    state.loading = false;
  },
  GET_MENUS_FAILURE(state: any) {
    state.loading = false;
  },

  SET_MENUS(state: any, routes: RouteConfig) {
    state.asyncRoutes = routes;
    state.routes = constantRoutes.concat(routes);
  },

  LOADING_START(state: any) {
    state.loading = true;
  },
  LOADING_END(state: any) {
    state.loading = false;
  }
  
};

const actions = {
  async GET_MENUS_REQUEST({ commit }: any, payload: any) {
    commit(GET_MENUS_REQUEST);

    // 返回得到的permissions
    return await getMenus()
      .then((res: any) => {
        const { data } = res;

        // 处理数据
        if( data && data.success ) {
          commit(GET_MENUS_SUCCESS, { permissions: data.data });
          return data.data;
        }else {
          commit(GET_MENUS_FAILURE);
          window.vue.$alarm.showErrorMsg(messages.RETRY_REFRESH);
          return null;
        }
      })
      .catch((err: any) => {
        window.vue.$alarm.showErrorMsg(messages.RETRY_REFRESH);
        return null;
      });
  },
};

export default {
  state,
  mutations,
  actions,
};
