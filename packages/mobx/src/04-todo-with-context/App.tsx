import { Stores } from './stores';
import { TodoAdd } from './components/TodoAdd';
import { TodoList } from './components/TodoList';
import React, { createContext } from 'react';

export const TodoWithContext = () => {
  const TodoContext = createContext(Stores.todoListStore);
  return (
    <>
      <h1>Todo - MobX-React w/ ContextAPI</h1>
      <TodoContext.Provider value={Stores.todoListStore}>
        <TodoContext.Consumer>
          {store => (
            <>
              <TodoAdd store={store} />
              <hr />
              <TodoList store={store} />
            </>
          )}
        </TodoContext.Consumer>
      </TodoContext.Provider>
    </>
  );
};
