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
      onClickDate={handleClickDate}
      onClickPrevMonth={handleClickMonth}
      onClickNextMonth={handleClickMonth}
    />
  );
};
