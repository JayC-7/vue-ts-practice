import { LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS } from "../types";
import { login } from "../../api/user";
import message from "../../utils/messages";

const state = {
  loginLoading: false,
  token: "",
};

const mutations = {
  LOGIN_REQUEST(state: any) {
    state.loginLoading = true;
  },
  LOGIN_FAILURE(state: any) {
    state.loginLoading = false;
  },
  LOGIN_SUCCESS(state: any, token: string) {
    state.loginLoading = false;
    state.token = token;
  },
};

const actions = {
  LOGIN_REQUEST(
    { commit }: any,
    payload: { username: string; password: string }
  ) {
    commit(LOGIN_REQUEST);
    
    // login request
    login(payload)
      .then((res: any) => {
        const { data } = res;
        if (data && data.success) {
          commit(LOGIN_SUCCESS, data.token);
          window.utils.setToken(data.token);
          window.vue.$router.push("/");
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
};

export default {
  state,
  mutations,
  actions,
};
