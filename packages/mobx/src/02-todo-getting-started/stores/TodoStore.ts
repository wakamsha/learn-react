import { action, autorun, computed, observable } from 'mobx';

export type Todo = {
  task: string;
  completed: boolean;
  assignee?: string;
};

export class TodoStore {
  @observable public todos: Todo[] = [];

  @observable public pendingRequests = 0;

  constructor() {
    autorun(() => console.info(this.report));
  }

  @action
  public addTodo(task: string) {
    this.todos.push({
      task,
      completed: false,
    });
  }

  @action
  public addPendingRequests(val: number) {
    this.pendingRequests += val;
  }

  @computed
  public get report(): string {
    const filteredTodos = this.todos.filter(todo => !todo.completed);
    if (!filteredTodos.length) {
      return '<none>';
    }
    return `Next todo: "${filteredTodos[0].task}". Progress: ${this.completedTodosCount}/${this.todos.length}`;
  }

  @computed
  private get completedTodosCount(): number {
    return this.todos.filter(todo => todo.completed).length;
  }
}
