import { TodoListStore } from './TodoListStore';

const todoListStore = new TodoListStore();

export const Stores = {
  todoListStore,
} as const;
