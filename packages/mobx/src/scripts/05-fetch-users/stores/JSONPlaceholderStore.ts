import { User } from '../infras/model';
import { action, flow, observable } from 'mobx';
import { requestGetUser, requestGetUsers, requestPostUser } from '../infras/client';

export class JSONPlaceholderStore {
  @observable
  public users: User[] = [];

  @observable
  public userId = 0;

  @observable
  public name = '';

  @observable
  public job = '';

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

  public getAllUsers = flow(function*(this: JSONPlaceholderStore) {
    this.users = yield requestGetUsers();
  });

  public getUser = flow(function*(this: JSONPlaceholderStore) {
    this.users = yield requestGetUser({
      path: this.userId ? `/${this.userId}` : '',
    });
  });

  public postUser = flow(function*(this: JSONPlaceholderStore) {
    this.users = yield requestPostUser({
      send: {
        name: this.name,
        job: this.job,
      },
    });
  });
}
