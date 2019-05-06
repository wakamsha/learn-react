import { ObservableTodoStore } from './ObservableTodoStore';
import { TodoStore } from './TodoStore';

export namespace Stores {
  export const todoStore = new TodoStore();
  export const observableTodoStore = new ObservableTodoStore();
}
