import * as React from 'react';
import { AddAction } from '../actions';

export type Props = {
  onSubmit: (text: string) => AddAction;
};

export const AddTodo = ({ onSubmit }: Props) => {
  const [input, setInput] = React.useState('');

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.currentTarget.value);
  const handleSubmit = (e: React.FormEvent) => {
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
