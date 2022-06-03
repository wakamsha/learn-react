import { useState } from 'react';
import { Calendar } from '.';

export const Story = () => {
  const [date, setDate] = useState(new Date());

  const [month, setMonth] = useState(new Date());

  return (
    <Calendar
      value={date}
      page={month}
      maxDate={new Date()}
      minDate={new Date(2020, 0, 10)}
      onChangeDate={setDate}
      onChangeMonth={setMonth}
    />
  );
};
