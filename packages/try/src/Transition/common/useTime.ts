import { useEffect, useState } from 'react';

export function useTime() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(formatter.format(new Date()));
    }, 100);

    return () => {
      clearInterval(interval);
    };
  });

  return time;
}

const formatter = Intl.DateTimeFormat('ja-JP', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  fractionalSecondDigits: 1,
});
