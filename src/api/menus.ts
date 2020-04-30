import service from "@/net/request";

export const getMenus = (options?: object) => {
    // const {} = options;
    return service({
      url: "/getMenus",
      method: "post",
    });
}
