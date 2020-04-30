class Alarm {
  static showErrorMsg(message: string, duration?: number, onClose?: object) {
    return this.showMessage("error", message, duration, onClose);
  }

  static showWarnMsg(message: string, duration?: number, onClose?: object) {
    return this.showMessage("warning", message, duration, onClose);
  }

  static showMessage(
    type: "error" | "success" | "info" | "warning" = "info",
    message: string,
    duration?: number,
    onClose?: object
  ) {
    let messageFunc;
    switch (type) {
      case "info":
        messageFunc = window.vue.$message.info;
        break;
      case "success":
        messageFunc = window.vue.$message.success;
        break;
      case "error":
        messageFunc = window.vue.$message.error;
        break;
      case "warning":
        messageFunc = window.vue.$message.warning;
        break;
      default:
        messageFunc = window.vue.$message.info;
        break;
    }

    return messageFunc(message, duration, onClose);
  }
}

export function install(Vue: any) {
  window.$alarm = Alarm;
  Object.defineProperty(Vue.prototype, "$alarm", { value: Alarm });
}
