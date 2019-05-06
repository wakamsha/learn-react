import * as React from 'react';
import { Stores } from './stores';
import { TodoAdd } from './components/TodoAdd';
import { TodoList } from './components/TodoList';

const TodoContext = React.createContext(Stores.todoListStore);

export const TodoWithContext = () => (
  <>
    <h1>Todo - MobX-React w/ ContextAPI</h1>
    <TodoContext.Provider value={Stores.todoListStore}>
      {/* <>
        <TodoContext.Consumer>
          {store => (
            <>
              <TodoAdd store={store} />
              <TodoList store={store} />
            </>
          )}
        </TodoContext.Consumer>
      </> */}
      <TodoContext.Consumer>{store => <TodoAdd store={store} />}</TodoContext.Consumer>
      <hr />
      <TodoContext.Consumer>{store => <TodoList store={store} />}</TodoContext.Consumer>
    </TodoContext.Provider>
  </>
);
