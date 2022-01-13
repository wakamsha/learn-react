import { useState } from 'react';
import { useDebounce } from '.';

export const Story = () => {
  const [value, setValue] = useState('');
  const [delay, setDelay] = useState(1000);

  const debouncedValue = useDebounce(value, delay);

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
