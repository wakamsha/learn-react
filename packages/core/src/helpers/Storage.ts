import { destroyCookie, getCookie, setCookie } from './Cookie';

type Storage = {
  getValue: (key: string) => string;
  setValue: (key: string, value: string) => void;
  removeValue: (key: string) => void;
};

type StorageType = 'cookieStorage' | 'sessionStorage' | 'localStorage';

/**
 * Web Storage または Cookie を使用するためのクラス。
 *
 * LocalStorage にアクセスできなかった場合は、代わりに Cookie を使用します。
 *
 * @param {StorageType} storageType 使用するストレージの種類
 */
export class StorageProxy {
  private readonly storage: Storage;

  constructor(storageType: StorageType) {
    switch (storageType) {
      case 'cookieStorage':
        this.storage = new CookieStorage();
        return;
      case 'sessionStorage':
        this.storage = new SessionStorage();
        return;
      case 'localStorage':
        this.storage = this.isAvailableLocalStorage() ? new LocalStorage() : new CookieStorage();
    }
  }

  public getValue(key: string) {
    return this.storage.getValue(key);
  }

  public setValue(key: string, value: string) {
    this.storage.setValue(key, value);
  }

  public removeValue(key: string) {
    this.storage.removeValue(key);
  }

  private isAvailableLocalStorage() {
    // window.localStorage にアクセスできない場合を考慮して try/catch を使用している。
    try {
      return !!localStorage;
    } catch {
      return false;
    }
  }
}

class CookieStorage implements Storage {
  public getValue(key: string) {
    return getCookie(key) || '';
  }

  public setValue(key: string, value: string) {
    setCookie({ cname: key, cvalue: value });
  }

  public removeValue(key: string) {
    destroyCookie(key);
  }
}

class SessionStorage implements Storage {
  public getValue(key: string): string {
    return sessionStorage[key] ?? '';
  }

  public setValue(key: string, value: string) {
    sessionStorage[key] = value;
  }

  public removeValue(key: string) {
    sessionStorage.removeValue(key);
  }
}

class LocalStorage implements Storage {
  public getValue(key: string): string {
    return localStorage[key] ?? '';
  }

  public setValue(key: string, value: string) {
    localStorage[key] = value;
  }

  public removeValue(key: string) {
    localStorage.removeValue(key);
  }
}
