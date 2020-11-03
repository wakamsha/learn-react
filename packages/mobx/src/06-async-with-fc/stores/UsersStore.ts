import { User } from '../infra/model';
import { action, makeObservable, observable } from 'mobx';
import { createContext } from 'react';
import { flow } from '../utils/Decorator';
import { requestGetUser, requestGetUsers, requestPostUser } from '../infra/client';

export class UsersStore {
  public static Context = createContext<UsersStore | null>(null);

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

  @flow
  public *getAllUsers() {
    const users: User[] = yield requestGetUsers();
    this.setUsers(users);
  }

  @flow
  public *getUser() {
    this.users = yield requestGetUser({
      path: this.userId ? `${this.userId}` : '',
    });
  }

  @flow
  public *postUser() {
    this.users = yield requestPostUser({
      send: {
        name: this.name,
        job: this.job,
      },
    });
  }
}
