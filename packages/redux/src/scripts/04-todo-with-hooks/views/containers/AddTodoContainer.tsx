import { AddTodo } from '../components/AddTodo';
import { addTodo } from '../../state/todos/actions';
import { useDispatch } from 'react-redux';
import React from 'react';

export const AddTodoContainer = () => {
  const dispatch = useDispatch();

  const handleSubmit = useCallback((text: string) => dispatch(addTodo(text)), [dispatch]);

  return <AddTodo onSubmit={handleSubmit} />;
};
