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
 * @param storageType - 使用するストレージの種類
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

  /**
   * ストレージから任意の値を取得します。
   *
   * @param key - 取得したい値のキー
   */
  public getValue(key: string) {
    return this.storage.getValue(key);
  }

  /**
   * ストレージに任意の値を保存し永続化します。
   * 指定したキーが既に存在する場合は、新しい値で上書きします。
   *
   * @param key   - 保存したい値のキー
   *
   * @param value - 保存する値
   */
  public setValue(key: string, value: string) {
    this.storage.setValue(key, value);
  }

  /**
   * ストレージから任意の値を削除します。
   *
   * @param key - 削除したい値のキー
   */
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
    return getCookie(key) ?? '';
  }

  public async setValue(key: string, value: string) {
    await setCookie({ cname: key, cvalue: value });
  }

  public async removeValue(key: string) {
    await destroyCookie(key);
  }
}

class SessionStorage implements Storage {
  public getValue(key: string): string {
    return (sessionStorage[key] ?? '') as string;
  }

  public setValue(key: string, value: string) {
    sessionStorage[key] = value;
  }

  public removeValue(key: string) {
    sessionStorage.removeItem(key);
  }
}

class LocalStorage implements Storage {
  public getValue(key: string): string {
    return (localStorage[key] ?? '') as string;
  }

  public setValue(key: string, value: string) {
    localStorage[key] = value;
  }

  public removeValue(key: string) {
    localStorage.removeItem(key);
  }
}
