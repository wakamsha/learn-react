import { autorun, computed, observable } from 'mobx';

type Todo = {
  task: string;
  completed: boolean;
  assignee?: string;
};

export class ObservableTodoStore {
  @observable
  public todos: Todo[] = [];

  @observable
  public pendingRequests = 0;

  constructor() {
    autorun(() => console.log(this.report));
  }

  public addTodo(task: string) {
    this.todos.push({
      task,
      completed: false,
    });
  }

  @computed
  public get report(): string {
    if (!this.todos.length) {
      return '<none>';
    }
    return `Next todo: "${this.todos[0].task}". Progress: ${this.completedTodosCount}/${this.todos.length}`;
  }

  @computed
  private get completedTodosCount(): number {
    return this.todos.filter(todo => todo.completed).length;
  }
}
