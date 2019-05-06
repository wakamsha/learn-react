// https://mobx.js.org/getting-started.html

import * as React from 'react';
import { TodoList } from './components/TodoList';
import { TodoStore } from './stores/TodoStore';

export const TodoGettingStarted = () => <TodoList store={new TodoStore()} />;
