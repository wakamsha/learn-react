import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../state/store';
import { toggleTodo } from '../../state/todos/actions';
import { Todo } from '../../state/todos/reducers';
import { getFilteredTodos } from '../../state/todos/selectors';
import { TodoList } from '../components/TodoList';

export const TodoListContainer = () => {
  const todos = useSelector<AppState, Todo[]>(({ todos, filter }) => getFilteredTodos(todos, filter));

  const dispatch = useDispatch();

  const handleClick = useCallback((id: number) => dispatch(toggleTodo(id)), [dispatch]);

  return <TodoList todos={todos} onClick={handleClick} />;
};
