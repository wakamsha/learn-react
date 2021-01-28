import { action, observable } from 'mobx';
import { requestGetUser, requestGetUsers, requestPostUser } from '../infra/client';
import { User } from '../infra/model';
import { flow } from '../utils/Decorator';

export class JSONPlaceholderStore {
  @observable public users: User[] = [];

  @observable public userId = 0;

  @observable public name = '';

  @observable public job = '';

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
      path: this.userId ? `/${this.userId}` : '',
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
