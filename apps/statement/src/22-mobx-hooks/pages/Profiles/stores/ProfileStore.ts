import { useContext } from '@learn-react/core/hooks/useContext';
import { action, makeObservable, observable } from 'mobx';
import { createContext } from 'react';

export class ProfileStore {
  public static Context = createContext<ProfileStore | null>(null);

  public static useStore() {
    return useContext(ProfileStore.Context);
  }

  public name = '';

  constructor() {
    makeObservable(this, {
      name: observable,
      setName: action,
    });
  }

  public setName(name: string) {
    this.name = name;
  }
}
