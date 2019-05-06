import { User } from '../infras/model';
import { flow, observable } from 'mobx';
import { requestGetUsers } from '../infras/client';

export class JSONPlaceholderStore {
  @observable
  public users: User[] = [];

  public getAllUsers = flow(function*(this: JSONPlaceholderStore) {
    this.users = yield requestGetUsers();
  });
}
