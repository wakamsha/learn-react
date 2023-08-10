import { action, makeObservable, observable } from 'mobx';

export class ProfileStore {
  @observable public name = '';

  constructor() {
    makeObservable(this);
  }

  @action
  public setName(name: string) {
    this.name = name;
  }
}
