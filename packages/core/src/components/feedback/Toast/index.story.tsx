import { css } from '@emotion/css';
import { ChangeEvent, FormEvent, useState } from 'react';
import { gutter } from '../../helpers/Style';
import { ToastProvider, useToast } from '.';

export const Story = () => (
  <ToastProvider>
    <AddMessage />
  </ToastProvider>
);

const AddMessage = () => {
  const { addToast } = useToast();

  const [value, setValue] = useState('');

  const [theme, setTheme] = useState<'primary' | 'danger'>('primary');

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setTheme(e.target.value as 'primary' | 'danger');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addToast({ content: value || 'Hello World!', theme });
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input className={styleInput} value={value} onChange={handleInput} placeholder="メッセージを入力してください" />
      <ul>
        {['primary', 'danger'].map(label => (
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

const styleInput = css`
  display: block;
  width: 100%;
  padding: ${gutter(1)};
`;
