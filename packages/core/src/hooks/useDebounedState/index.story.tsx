import { useState } from 'react';
import { useDebouncedState } from '.';

export const Story = () => {
  const [delay, setDelay] = useState(1000);

  const [value, debouncedValue, setValue] = useDebouncedState('', delay);

  return (
    <>
      <h2>Basic</h2>
      <div>
        <label>
          Value:
          <input value={value} onChange={e => setValue(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Delay:
          <input type="number" value={delay} onChange={e => setDelay(Number(e.target.value))} />
        </label>
      </div>
      <code>
        <pre>{JSON.stringify(debouncedValue, null, 2)}</pre>
      </code>
    </>
  );
};
