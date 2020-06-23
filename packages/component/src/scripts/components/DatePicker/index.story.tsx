import { Calendar } from './Calendar';
import React, { useState } from 'react';

export const Story = () => {
  const [date, setDate] = useState(new Date());

  const handleClickDate = (date: Date) => setDate(date);

  return <Calendar value={date} page={date} onClickDate={handleClickDate} />;
};
