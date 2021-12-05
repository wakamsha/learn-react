import { useState } from 'react';
import { ComboBox } from '.';

type Option = {
  label: string;
  value: string;
};

export const Story = () => {
  const options: Option[] = [
    {
      label: 'Apple',
      value: 'りんご',
    },
    {
      label: 'Banana',
      value: 'バナナ',
    },
    {
      label: 'Orange',
      value: 'みかん',
    },
  ];

  const [state1, setState1] = useState<Option | null>(options[0]);

  const handleChange1 = (item: typeof options[number] | null) => {
    setState1(item);
  };

  return (
    <>
      <h2>Basic</h2>
      <ComboBox
        options={options}
        value={state1 ? state1.value : null}
        onChange={handleChange1}
        icon="list"
        placeholder="くだもの"
      />
      <pre>
        <code>{JSON.stringify(state1, null, 2)}</code>
      </pre>

      <h2>Disabled</h2>
      <ComboBox options={options} value={state1 ? state1.value : null} onChange={handleChange1} icon="list" disabled />
    </>
  );
};
