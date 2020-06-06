import { useToast } from '../Toast';
import React, { ChangeEvent, FormEvent, useState } from 'react';

export const AddMessage = (): JSX.Element => {
  const { addToast } = useToast();

  const [value, setValue] = useState('');

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addToast(value || 'Hello World!');
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={value} onChange={handleInput} placeholder="メッセージを入力してください" />
    </form>
  );
};
