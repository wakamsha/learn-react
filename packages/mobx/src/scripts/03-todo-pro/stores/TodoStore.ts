import { action, observable } from 'mobx';

export class TodoStore {
  private _id = Math.random();

  @observable
  private _task = '';

  @observable
  private _completed = false;

  public get task(): string {
    return this._task;
  }

  public get completed(): boolean {
    return this._completed;
  }

  constructor(task: string) {
    this._task = task;
  }

  public get id(): number {
    return this._id;
  }

  @action
  public toggleCompleted() {
    this._completed = !this._completed;
  }

  @action
  public updateTask(task: string) {
    this._task = task;
  }
}
