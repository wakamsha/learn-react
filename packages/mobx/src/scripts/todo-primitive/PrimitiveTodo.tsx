import * as React from 'react';
import { Stores } from './stores';

export const PrimitiveTodo = () => {
  React.useEffect(() => {
    // Stores.todoStore.addTodo('foo');
    // console.log(Stores.todoStore.report());

    // Stores.todoStore.addTodo('bar');
    // console.log(Stores.todoStore.report());

    // Stores.todoStore.todos[0].completed = true;
    // console.log(Stores.todoStore.report());

    // Stores.todoStore.todos[1].task = 'fuga';
    // console.log(Stores.todoStore.report());

    // Stores.todoStore.todos[0].task = 'hoge';
    // console.log(Stores.todoStore.report());

    Stores.observableTodoStore.addTodo('foo');
    Stores.observableTodoStore.addTodo('bar');
    Stores.observableTodoStore.todos[0].completed = true;
    Stores.observableTodoStore.todos[1].task = 'fuga';
    Stores.observableTodoStore.todos[0].task = 'hoge';
  }, []);
  return null;
};
