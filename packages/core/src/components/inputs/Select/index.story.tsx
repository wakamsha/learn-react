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
      id: 'beatles',
      label: 'The Beatles',
      options: [
        { label: 'John Lennon', value: 'JohnLennon' },
        { label: 'Paul McCartney', value: 'PaulMcCartney' },
        { label: 'George Harrison', value: 'GeorgeHarrison' },
        { label: 'Ringo Starr', value: 'RingoStarr' },
        { label: 'George Martin', value: 'GeorgeMartin', disabled: true },
      ],
    },
    {
      id: 'stones',
      label: 'The Rolling Stones',
      options: [
        { label: 'Mick', value: 'Mick' },
        { label: 'Keith', value: 'Keith' },
        { label: 'Ronnie', value: 'Ronnie' },
        { label: 'Charlie', value: 'Charlie' },
      ],
    },
  ];

  const [state1, setState1] = useState(options[0].value);

  const [state2, setState2] = useState(optGroups[0].options[0].value);

  const handleChange1 = ({ value }: { value: string }) => setState1(value);

  const handleChange2 = ({ value }: { value: string }) => setState2(value);

  return (
    <>
      <h2>Basic</h2>
      <Select options={options} value={state1} onChange={handleChange1} icon="list" />
      <pre>
        <code>{JSON.stringify({ value: state1 }, null, 2)}</code>
      </pre>

      <h2>Use Optgroup</h2>
      <Select optGroups={optGroups} value={state2} onChange={handleChange2} />
      <pre>
        <code>{JSON.stringify({ value: state2 }, null, 2)}</code>
      </pre>

      <h2>Disabled</h2>
      <Select options={options} value={options[0].value} onChange={console.info} disabled />
    </>
  );
};
