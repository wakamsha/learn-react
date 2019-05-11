import { action, autorun, computed, observable } from 'mobx';

export type Todo = {
  task: string;
  completed: boolean;
  assignee?: string;
};

export class TodoStore {
  @observable
  private _todos: Todo[] = [];

  @observable
  private _pendingRequests = 0;

  public get todos(): Todo[] {
    return this._todos;
  }

  public get pendingRequests(): number {
    return this._pendingRequests;
  }

  constructor() {
    autorun(() => console.log(this.report));
  }

  @action
  public addTodo(task: string) {
    this._todos.push({
      task,
      completed: false,
    });
  }

  @action
  public addPendingRequests(val: number) {
    this._pendingRequests += val;
  }

  @computed
  public get report(): string {
    const filteredTodos = this._todos.filter(todo => !todo.completed);
    if (!filteredTodos.length) {
      return '<none>';
    }
    return `Next todo: "${filteredTodos[0].task}". Progress: ${this.completedTodosCount}/${this._todos.length}`;
  }

  @computed
  private get completedTodosCount(): number {
    return this._todos.filter(todo => todo.completed).length;
  }
}
