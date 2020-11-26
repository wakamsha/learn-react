import { useLetterTicker } from '.';
import React, { useRef, useState } from 'react';

export const Story = () => {
  const ref = useRef<HTMLDivElement>(null);

  const [value, setValue] = useState('');
  const [input, setInput] = useState('hello world!');

  const [start] = useLetterTicker(ref);

  const handleSubmit = () => {
    setValue(input);
    start();
  };

  return (
    <>
      <form onSubmit={e => e.preventDefault()}>
        <input value={input} onChange={e => setInput(e.target.value)} />
        <button onClick={handleSubmit}>submit</button>
      </form>
      <div ref={ref}>{value}</div>
    </>
  );
};
