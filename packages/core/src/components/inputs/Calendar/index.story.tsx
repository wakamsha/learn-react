import { useState } from 'react';
import { Calendar } from '.';
import { gutter } from '../../../helpers/Style';
import { Card } from '../../surfaces/Card';

export const Story = () => {
  const [date, setDate] = useState(new Date());

  const [month, setMonth] = useState(new Date());

  return (
    <>
      <h2>Basic</h2>
      <Calendar
        value={date}
        page={month}
        maxDate={new Date()}
        minDate={new Date(2020, 0, 10)}
        onChangeDate={setDate}
        onChangeMonth={setMonth}
      />

      <h2>With Card</h2>
      <Card width={280}>
        <div style={{ padding: gutter(4) }}>
          <Calendar
            value={date}
            page={month}
            maxDate={new Date()}
            minDate={new Date(2020, 0, 10)}
            onChangeDate={setDate}
            onChangeMonth={setMonth}
          />
        </div>
      </Card>
    </>
  );
};
