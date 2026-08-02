import { makeAutoObservable } from 'mobx';

export class ProfileStore {
  public name = '';

  constructor() {
    makeAutoObservable(this);
  }

  public setName(name: string) {
    this.name = name;
  }
}
