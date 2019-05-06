import { TodoStore } from './TodoStore';
import { action, computed, observable } from 'mobx';

export class TodoListStore {
  @observable
  public task = '';

  @observable
  public todos: TodoStore[] = [];

  @action
  public setTask(value: string) {
    this.task = value;
  }

  @action
  public addTodo() {
    this.todos.push(new TodoStore(this.task));
    this.task = '';
  }

  @computed
  public get report(): string {
    const filteredTodos = this.todos.filter(todo => !todo.completed);
    if (!filteredTodos.length) {
      return '<NONE>';
    }
    return `Next todo: "${filteredTodos[0].task}". Progress: ${this.completedTodosCount}/${this.todos.length}`;
  }

  @computed
  private get completedTodosCount(): number {
    return this.todos.filter(todo => todo.completed).length;
  }
}
