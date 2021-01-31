import { useState } from 'react';
import { Tabs } from '.';

const options = [
  {
    label: 'ITEM ONE',
    value: 1,
  },
  {
    label: 'ITEM TWO',
    value: 2,
  },
  {
    label: 'ITEM THREE',
    value: 3,
  },
];

export const Story = () => {
  const [state, setState] = useState(1);

  const handleChange = ({ value }: { value: number }) => setState(value);

  return (
    <>
      <h3>Basic</h3>
      <p>
        Current state: <code>{state}</code>
      </p>
      <Tabs options={options} value={state} onChange={handleChange} />

      <h3>Sizes</h3>
      <Tabs options={options} value={1} onChange={console.info} />
      <Tabs options={options} value={1} onChange={console.info} size="small" />
    </>
  );
};
