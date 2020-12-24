// https://mobx.js.org/getting-started.html

import { TodoList } from './components/TodoList';
import { TodoStore } from './stores/TodoStore';

export const TodoGettingStarted = () => <TodoList store={new TodoStore()} />;
