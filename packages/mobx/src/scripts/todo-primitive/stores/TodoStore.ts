type Todo = {
  task: string;
  completed: boolean;
  assignee?: string;
};

export class TodoStore {
  public todos: Todo[] = [];

  public report(): string {
    if (!this.todos.length) {
      return '<none>';
    }
    return `Next todo: "${this.todos[0].task}". Progress: ${this.completedTodosCount}/${this.todos.length}`;
  }

  public addTodo(task: string) {
    this.todos.push({
      task,
      completed: false,
    });
  }

  private get completedTodosCount(): number {
    return this.todos.filter(todo => todo.completed).length;
  }
}
