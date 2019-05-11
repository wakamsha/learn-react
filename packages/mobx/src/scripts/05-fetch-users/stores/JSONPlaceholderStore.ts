import { User } from '../infras/model';
import { action, observable } from 'mobx';
import { flow } from '../utils/Decorator';
import { requestGetUser, requestGetUsers, requestPostUser } from '../infras/client';

export class JSONPlaceholderStore {
  @observable
  private _users: User[] = [];

  @observable
  private _userId = 0;

  @observable
  private _name = '';

  @observable
  private _job = '';

  @observable
  private _fetching = false;

  public get users(): User[] {
    return this._users;
  }

  public get userId(): number {
    return this._userId;
  }

  public get name(): string {
    return this._name;
  }

  public get job(): string {
    return this._job;
  }

  public get fetching(): boolean {
    return this._fetching;
  }

  @action
  public setUserId(id: number) {
    this._userId = id;
  }

  @action
  public setName(name: string) {
    this._name = name;
  }

  @action
  public setJob(job: string) {
    this._job = job;
  }

  @flow
  public *getAllUsers() {
    this._fetching = true;
    this._users = yield requestGetUsers();
    this._fetching = false;
  }

  @flow
  public *getUser() {
    this._fetching = true;
    this._users = yield requestGetUser({
      path: this._userId ? `/${this._userId}` : '',
    });
    this._fetching = false;
  }

  @flow
  public *postUser() {
    this._fetching = true;
    this._users = yield requestPostUser({
      send: {
        name: this._name,
        job: this._job,
      },
    });
    this._fetching = false;
  }
}
