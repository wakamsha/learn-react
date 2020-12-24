import { useState } from 'react';
import { Range } from '.';

export const Story = () => {
  const [value, setValue] = useState(50);

  return (
    <>
      <h3>Basic</h3>
      <Range value={value} onChange={setValue} step={0.5} />
      <p>
        Value: <b>{value}</b>
      </p>
      <h3>Theme</h3>
      <Range value={50} onChange={console.info} theme="primary" />
      <Range value={50} onChange={console.info} theme="secondary" />
      <Range value={50} onChange={console.info} theme="info" />
    </>
  );
};
