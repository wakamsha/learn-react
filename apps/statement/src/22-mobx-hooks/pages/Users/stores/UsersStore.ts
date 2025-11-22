import {
  type CreateUserResponse,
  requestGetUser,
  requestGetUsers,
  requestPostUser,
  type User,
} from '@learn-react/core/src/api/user';
import { useContext } from '@learn-react/core/src/hooks/useContext';
import { action, makeObservable, observable, runInAction } from 'mobx';
import { createContext } from 'react';

export class UsersStore {
  public static Context = createContext<UsersStore | null>(null);

  public static useStore() {
    // oxlint-disable-next-line react-hooks/rules-of-hooks
    return useContext(UsersStore.Context);
  }

  public users: (User | CreateUserResponse)[] = [];

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
      resetUsers: action,
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

  public resetUsers() {
    this.users = [];
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
