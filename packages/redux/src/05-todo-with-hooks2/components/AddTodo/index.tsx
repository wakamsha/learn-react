import React, { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { Actions } from '../../states/Todo/reducer';

export const AddTodo = () => {
  const dispatch = useDispatch<Dispatch<Actions>>();

  const [input, setInput] = useState('');

  const handleChangeInput = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => setInput(value);

  const handleSubmit = () => {
    dispatch({
      type: 'Todo.add',
      payload: {
        id: Date.now(),
        text: input,
      },
    });
  };

  return (
    <form onSubmit={e => e.preventDefault()}>
      <input onChange={handleChangeInput} value={input} />
      <button onClick={handleSubmit}>Add Todo</button>
    </form>
  );
};
