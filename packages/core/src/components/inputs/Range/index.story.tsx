import { useState } from 'react';
import { Range } from '.';

export const Story = () => {
  const [value, setValue] = useState(50);

  return (
    <>
      <h2>Basic</h2>
      <Range value={value} onChange={setValue} step={0.5} />
      <p>
        Value: <b>{value}</b>
      </p>
      <h2>Theme</h2>
      <Range value={50} onChange={console.info} theme="primary" />
      <Range value={50} onChange={console.info} theme="danger" />
    </>
  );
};
