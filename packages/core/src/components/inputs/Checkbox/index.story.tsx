import { useState } from 'react';
import { Checkbox } from '.';

export const Story = () => {
  const [checked1, setChecked1] = useState(false);

  const [checked2, setChecked2] = useState(false);

  const [indeterminate, setIndeterminate] = useState(false);

  const handleChange1 = () => setChecked1(v => !v);

  const handleChange2 = () => setChecked2(v => !v);

  const handleChangeIndeterminate = () => setIndeterminate(v => !v);

  return (
    <ul>
      <li>
        <Checkbox checked={checked1} onChange={handleChange1} />
      </li>
      <li>
        <Checkbox.Label label="Checkbox">
          <Checkbox checked={checked2} onChange={handleChange2} />
        </Checkbox.Label>
      </li>
      <li>
        <Checkbox.Label label="Switch to indeterminate">
          <Checkbox onChange={handleChangeIndeterminate} checked={indeterminate} />
        </Checkbox.Label>
      </li>
      <li>
        <Checkbox indeterminate={indeterminate} />
      </li>
      <li>
        <Checkbox disabled />
      </li>
      <li>
        <Checkbox disabled checked />
      </li>
    </ul>
  );
};
