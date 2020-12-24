// https://mobx.js.org/getting-started.html

import { useEffect } from 'react';
import { Stores } from './stores';

export const TodoPrimitive = () => {
  useEffect(() => {
    // Stores.todoStore.addTodo('foo');
    // console.info(Stores.todoStore.report());

    // Stores.todoStore.addTodo('bar');
    // console.info(Stores.todoStore.report());

    // Stores.todoStore.todos[0].completed = true;
    // console.info(Stores.todoStore.report());

    // Stores.todoStore.todos[1].task = 'fuga';
    // console.info(Stores.todoStore.report());

    // Stores.todoStore.todos[0].task = 'hoge';
    // console.info(Stores.todoStore.report());

    Stores.observableTodoStore.addTodo('foo');
    Stores.observableTodoStore.addTodo('bar');
    Stores.observableTodoStore.todos[0].completed = true;
    Stores.observableTodoStore.todos[1].task = 'fuga';
    Stores.observableTodoStore.todos[0].task = 'hoge';
  }, []);
  return null;
};
