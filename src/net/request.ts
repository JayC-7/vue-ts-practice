import axios from "axios";

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL + process.env.VUE_APP_PREFIX,
});

const noAuthService = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL + process.env.VUE_APP_PREFIX,
});

service.interceptors.request.use((config) => {
  config.headers["Authorization"] = window.utils.getToken();
  return config;
});

export default service;
export { noAuthService };
