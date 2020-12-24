import { Provider } from 'mobx-react';
import { TodoAdd } from './components/TodoAdd';
import { TodoList } from './components/TodoList';
import { Stores } from './stores';

export const TodoPro = () => (
  <>
    <h1>Todo - Using Inject</h1>
    <Provider store={Stores.todoListStore}>
      <>
        <TodoAdd />
        <TodoList />
      </>
    </Provider>
  </>
);
