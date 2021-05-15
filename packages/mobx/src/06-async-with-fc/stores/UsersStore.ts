import { useContext } from '@learn-react/core/hooks/useContext';
import { action, makeObservable, observable } from 'mobx';
import { createContext } from 'react';
import { requestGetUser, requestGetUsers, requestPostUser } from '../infra/client';
import { User } from '../infra/model';

export class UsersStore {
  public static Context = createContext<UsersStore | null>(null);

  public static useStore() {
    return useContext(UsersStore.Context);
  }

  @observable public users: User[] = [];

  @observable public userId = 0;

  @observable public name = '';

  @observable public job = '';

  constructor() {
    makeObservable(this);
  }

  @action
  public setUserId(id: number) {
    this.userId = id;
  }

  @action
  public setName(name: string) {
    this.name = name;
  }

  @action
  public setJob(job: string) {
    this.job = job;
  }

  @action
  private setUsers(users: User[]) {
    this.users = users;
  }

  public async getAllUsers() {
    const users = await requestGetUsers();
    this.setUsers(users);
  }

  public async getUser() {
    const user = await requestGetUser({
      path: this.userId ? `${this.userId}` : '',
    });

    this.setUsers([user]);
  }

  public async postUser() {
    const user = await requestPostUser({
      send: {
        name: this.name,
        job: this.job,
      },
    });

    this.setUsers([user]);
  }
}
