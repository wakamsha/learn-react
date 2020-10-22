import { Actions } from '../../states/Todo/reducer';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import React, { ChangeEvent, useState } from 'react';

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
