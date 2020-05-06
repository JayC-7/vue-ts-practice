import request, { noAuthService as noAuthRequest } from "../net/request";

export const login = (options: any) => {
  const { username, password } = options;
  return noAuthRequest({
    url: "/login",
    method: "post",
    data: {
      username,
      password,
    },
  });
};

export const getUserProfile = () => {
  return request({
    url: "/getUserProfile",
    method: "get"
  });
};
