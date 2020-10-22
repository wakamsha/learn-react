import { ObservableTodoStore } from './ObservableTodoStore';
import { TodoStore } from './TodoStore';

const todoStore = new TodoStore();
const observableTodoStore = new ObservableTodoStore();

export const Stores = {
  todoStore,
  observableTodoStore,
} as const;
