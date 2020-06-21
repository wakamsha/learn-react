import { Selector, useMobxStore } from '../hooks/useMobxStore';
import { action, observable } from 'mobx';
import { createContext } from 'react';

export class ProfileStore {
  public static Context = createContext<ProfileStore | null>(null);

  public static useStore<S>(selector: Selector<ProfileStore, S>) {
    return useMobxStore(ProfileStore.Context, selector);
  }

  @observable public name = '';

  @action
  public setName(name: string) {
    this.name = name;
  }
}
