import { useState } from 'react';
import { Select } from '.';

export const Story = () => {
  const options = [
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

  const optGroups = [
    {
      id: 'foo',
      label: 'Theropods',
      options: [
        {
          label: 'Tyrannosaurus',
          value: 'Tyrannosaurus',
        },
        { label: 'Velociraptor', value: 'Velociraptor' },
        { label: 'Deinonychus', value: 'Deinonychus' },
      ],
    },
    {
      id: 'bar',
      label: 'Sauropods',
      options: [
        { label: 'Diplodocus', value: 'Diplodocus' },
        { label: 'Saltasaurus', value: 'Saltasaurus' },
        { label: 'Apatosaurus', value: 'Apatosaurus' },
      ],
    },
  ];

  const [state1, setState1] = useState(options[0].value);

  const [state2, setState2] = useState(optGroups[0].options[0].value);

  const handleChange1 = ({ value }: { value: string }) => setState1(value);

  const handleChange2 = ({ value }: { value: string }) => setState2(value);

  return (
    <>
      <h3>Basic</h3>
      <Select options={options} value={state1} onChange={handleChange1} icon="list" />
      <pre>
        <code>{JSON.stringify({ value: state1 }, null, 2)}</code>
      </pre>
      <h3>Use Optgroup</h3>
      <Select optGroups={optGroups} value={state2} onChange={handleChange2} />
      <pre>
        <code>{JSON.stringify({ value: state2 }, null, 2)}</code>
      </pre>
    </>
  );
};
