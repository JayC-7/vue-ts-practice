import {
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  GET_USER_PROFILE,
  SET_USER_PROFILE,
  LOADING_START,
} from "../types";
import { login, getUserProfile } from "../../api/user";
import message from "../../utils/messages";
import Cookie from "js-cookie";

const state = {
  loginLoading: false,
  token: "",
  userProfile: {},
};

const mutations = {
  [LOGIN_REQUEST](state: any) {
    state.loginLoading = true;
  },
  [LOGIN_FAILURE](state: any) {
    state.loginLoading = false;
  },
  [LOGIN_SUCCESS](state: any, token: string) {
    state.loginLoading = false;
    state.token = token;
  },

  [SET_USER_PROFILE](state: any, payload: any) {
    state.userProfile = payload;
  },
};

const actions = {
  [LOGIN_REQUEST](
    { commit }: any,
    payload: { username: string; password: string }
  ) {
    commit(LOGIN_REQUEST);

    // login request
    login(payload)
      .then((res: any) => {
        const { data } = res;
        if (data && data.success) {
          const { token, username } = data.data;
          commit(LOGIN_SUCCESS, token);
          window.utils.setToken(token);
          // 存入cookie，之后用于后端getUserProfile接口获取用户名
          Cookie.set("username", username);
          // 跳转重定向
          const redirect = window.vue.$route.query.redirect || "/";
          window.vue.$router.push(redirect);
        } else {
          commit(LOGIN_FAILURE);
          window.$alarm.showErrorMsg(data.message);
        }
      })
      .catch((err: any) => {
        commit(LOGIN_FAILURE);
        window.$alarm.showErrorMsg(message.LOGIN_FAILED);
      });
  },

  [GET_USER_PROFILE]({ commit }: any) {
    commit(LOADING_START);

    return getUserProfile()
      .then((res: any) => {
        const { data } = res;
        if (data && data.success) {
          commit(SET_USER_PROFILE, data.data);
          return data.data;
        }
      })
      .catch();
  },
};

export default {
  state,
  mutations,
  actions,
};
