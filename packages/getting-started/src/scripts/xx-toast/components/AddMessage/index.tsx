import { useToast } from '../Toast';
import React, { ChangeEvent, FormEvent, useState } from 'react';

export const AddMessage = (): JSX.Element => {
  const { addToast } = useToast();

  const [value, setValue] = useState('');

  const [theme, setTheme] = useState<'success' | 'danger'>('success');

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setTheme(e.target.value as 'success' | 'danger');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addToast({ content: value || 'Hello World!', theme });
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={value} onChange={handleInput} placeholder="メッセージを入力してください" />
      <ul>
        {['success', 'danger'].map(label => (
          <li key={label}>
            <label>
              <input type="radio" value={label} name="theme" checked={label === theme} onChange={handleChange} />
              {label}
            </label>
          </li>
        ))}
      </ul>
    </form>
  );
};
