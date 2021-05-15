import { useContext } from '@learn-react/core/hooks/useContext';
import { action, makeObservable, observable, runInAction } from 'mobx';
import { createContext } from 'react';
import { requestGetUser, requestGetUsers, requestPostUser } from '../infra/client';
import { User } from '../infra/model';

export class UsersStore {
  public static Context = createContext<UsersStore | null>(null);

  public static useStore() {
    return useContext(UsersStore.Context);
  }

  public users: User[] = [];

  public userId = 0;

  public name = '';

  public job = '';

  constructor() {
    makeObservable(this, {
      users: observable,
      userId: observable,
      name: observable,
      job: observable,
      setUserId: action,
      setName: action,
      setJob: action,
    });
  }

  public setUserId(id: number) {
    this.userId = id;
  }

  public setName(name: string) {
    this.name = name;
  }

  public setJob(job: string) {
    this.job = job;
  }

  public async getAllUsers() {
    const users = await requestGetUsers();
    runInAction(() => {
      this.users = users;
    });
  }

  public async getUser() {
    const user = await requestGetUser({
      path: this.userId ? `${this.userId}` : '',
    });

    runInAction(() => {
      this.users = [user];
    });
  }

  public async postUser() {
    const user = await requestPostUser({
      send: {
        name: this.name,
        job: this.job,
      },
    });

    runInAction(() => {
      this.users = [user];
    });
  }
}
