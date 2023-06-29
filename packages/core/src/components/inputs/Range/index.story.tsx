import { useState } from 'react';
import { Range } from '.';

export const Story = () => {
  const [value, setValue] = useState(50);

  return (
    <>
      <h2>Basic</h2>
      <Range value={value} step={0.5} onChange={setValue} />
      <p>
        Value: <b>{value}</b>
      </p>
      <h2>Theme</h2>
      <Range value={50} theme="primary" onChange={console.info} />
      <Range value={50} theme="danger" onChange={console.info} />
    </>
  );
};
