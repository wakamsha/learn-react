import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { Radio } from '.';

export const Story = () => {
  const [value, setValue] = useState('');

  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => setValue(value);

  return (
    <ul>
      <li>
        <Radio name="radio-group" value="foo" checked={value === 'foo'} onChange={handleChange} />
      </li>
      <li>
        <Radio.Label label="Radio Button 1">
          <Radio name="radio-group" value="bar" checked={value === 'bar'} onChange={handleChange} />
        </Radio.Label>
      </li>
      <li>
        <Radio.Label label="Radio Button 2">
          <Radio name="radio-group" value="baz" checked={value === 'baz'} onChange={handleChange} />
        </Radio.Label>
      </li>
      <li>
        <Radio.Label label="Radio Button 3">
          <Radio name="radio-group" value="lorem" checked={value === 'lorem'} disabled />
        </Radio.Label>
      </li>
    </ul>
  );
};
