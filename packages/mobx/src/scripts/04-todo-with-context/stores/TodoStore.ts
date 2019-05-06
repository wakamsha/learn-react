import { action, observable } from 'mobx';

export class TodoStore {
  private _id = Math.random();

  @observable
  public task = '';

  @observable
  public completed = false;

  constructor(task: string) {
    this.task = task;
  }

  public get id(): number {
    return this._id;
  }

  @action
  public toggleCompleted() {
    this.completed = !this.completed;
  }

  @action
  public updateTask(task: string) {
    this.task = task;
  }
}
