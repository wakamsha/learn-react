import * as React from 'react';
import { TodoList } from './components/TodoList';
import { TodoStore } from './stores/TodoStore';

export const TodoApp = () => <TodoList store={new TodoStore()} />;
