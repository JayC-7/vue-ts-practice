const tokenKey = process.env.VUE_APP_TOKEN_KEY || "token";

class Utils {
  static getToken(): object | string | null {
    return window.$localStorage.getItem(tokenKey);
  }

  static setToken(value: string, expires?: number): void {
    const temp = {
      name: tokenKey,
      value,
      expires,
      start: new Date().getTime(),
    };
    window.$localStorage.setItem(temp);
  }
}

export function install(Vue: any): void {
  window.utils = Utils;
  Object.defineProperty(Vue.prototype, "$utils", { value: Utils });
}

export default Utils;
