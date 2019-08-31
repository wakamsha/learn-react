import { TodoStore } from './TodoStore';
import { action, computed, observable } from 'mobx';

export class TodoListStore {
  @observable private _task = '';
  @observable private _todos: TodoStore[] = [];

  public get task(): string {
    return this._task;
  }

  public get todos(): TodoStore[] {
    return this._todos;
  }

  @action
  public setTask(value: string) {
    this._task = value;
  }

  @action
  public addTodo() {
    this._todos.push(new TodoStore(this._task));
    this._task = '';
  }

  @computed
  public get report(): string {
    const filteredTodos = this._todos.filter(todo => !todo.completed);
    if (!filteredTodos.length) {
      return '<NONE>';
    }
    return `Next todo: "${filteredTodos[0].task}". Progress: ${this.completedTodosCount}/${this._todos.length}`;
  }

  @computed
  private get completedTodosCount(): number {
    return this._todos.filter(todo => todo.completed).length;
  }
}
