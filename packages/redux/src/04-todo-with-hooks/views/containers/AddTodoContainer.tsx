import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../../state/todos/actions';
import { AddTodo } from '../components/AddTodo';

export const AddTodoContainer = () => {
  const dispatch = useDispatch();

  const handleSubmit = useCallback((text: string) => dispatch(addTodo(text)), [dispatch]);

  return <AddTodo onSubmit={handleSubmit} />;
};
