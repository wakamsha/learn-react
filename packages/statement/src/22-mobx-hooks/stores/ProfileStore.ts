import { action, makeObservable, observable } from 'mobx';
import { createContext } from 'react';
import { Selector, useMobxStore } from '../hooks/useMobxStore';

export class ProfileStore {
  public static Context = createContext<ProfileStore | null>(null);

  public static useStore<S>(selector: Selector<ProfileStore, S>) {
    return useMobxStore(ProfileStore.Context, selector);
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
