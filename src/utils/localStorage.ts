interface LocalStorageItemProps {
  name: string;
  value: string | number | boolean | object;
  expires?: number;
  start: number;
}

class LocalStoragePlus {
  static getItem(name: string): LocalStorageItemProps | string | null {
    let item: any = localStorage.getItem(name);
    const now = new Date().getTime();
    try {
      item = JSON.parse(item);

      // if expires not exist, will not expires by default
      if (item.expires) {
        // remove item if expired
        if (now - item.start > item.expires) {
          localStorage.removeItem(name);
          return null;
        } else {
          return item;
        }
      } else {
        return item;
      }
    } catch {
      return item;
    }
  }

  static setItem(params: LocalStorageItemProps): void {
    const { name } = params;
    const value = JSON.stringify(params);
    localStorage.setItem(name, value);
  }

  static removeItem(name: string): void {
    localStorage.removeItem(name);
  }

  static clear(): void {
    localStorage.clear();
  }
}

export function install(Vue: any) {
  window.$localStorage = LocalStoragePlus;
  Object.defineProperty(Vue.prototype, "$localStorage", {
    value: LocalStoragePlus,
  });
}
