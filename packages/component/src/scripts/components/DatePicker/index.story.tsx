import { Calendar } from './Calendar';
import React, { useState } from 'react';

export const Story = () => {
  const [date, setDate] = useState(new Date());

  const [month, setMonth] = useState(new Date());

  const handleClickDate = (date: Date) => setDate(date);

  const handleClickMonth = (date: Date) => setMonth(date);

  return (
    <Calendar
      value={date}
      page={month}
      maxDate={new Date()}
      minDate={new Date(2020, 0, 10)}
      onClickDate={handleClickDate}
      onClickPrevMonth={handleClickMonth}
      onClickNextMonth={handleClickMonth}
    />
  );
};
