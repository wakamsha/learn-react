import { action, observable } from 'mobx';

export class ProfileStore {
  @observable public name = '';

  @action
  public setName(name: string) {
    this.name = name;
  }
}
