import { AppState } from '../../state/store';
import { Todo } from '../../state/todos/reducers';
import { TodoList } from '../components/TodoList';
import { getFilteredTodos } from '../../state/todos/selectors';
import { toggleTodo } from '../../state/todos/actions';
import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback } from 'react';

export const TodoListContainer = () => {
  const todos = useSelector<AppState, Todo[]>(({ todos, filter }) => getFilteredTodos(todos, filter));

  const dispatch = useDispatch();

  const handleClick = useCallback((id: number) => dispatch(toggleTodo(id)), [dispatch]);

  return <TodoList todos={todos} onClick={handleClick} />;
};
