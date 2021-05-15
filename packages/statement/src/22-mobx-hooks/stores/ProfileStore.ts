import { useContext } from '@learn-react/core/hooks/useContext';
import { action, makeObservable, observable } from 'mobx';
import { createContext } from 'react';

export class ProfileStore {
  public static Context = createContext<ProfileStore | null>(null);

  public static useStore() {
    return useContext(ProfileStore.Context);
  }

  @observable public name = '';

  constructor() {
    makeObservable(this);
  }

  @action
  public setName(name: string) {
    this.name = name;
  }
}
