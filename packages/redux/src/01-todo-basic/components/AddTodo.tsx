import React, { ChangeEvent, FormEvent, useState } from 'react';
import { AddAction } from '../actions';

export type Props = {
  onSubmit: (text: string) => AddAction;
};

export const AddTodo = ({ onSubmit }: Props) => {
  const [input, setInput] = useState('');

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => setInput(e.currentTarget.value);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChangeInput} value={input} />
      <button>Add Todo</button>
    </form>
  );
};
