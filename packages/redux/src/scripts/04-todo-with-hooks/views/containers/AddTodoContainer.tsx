import * as React from 'react';
import { AddTodo } from '../components/AddTodo';
import { addTodo } from '../../state/todos/actions';
import { useDispatch } from 'react-redux';

export const AddTodoContainer = () => {
  const dispatch = useDispatch();

  const handleSubmit = React.useCallback((text: string) => dispatch(addTodo(text)), [dispatch]);

  return <AddTodo onSubmit={handleSubmit} />;
};
