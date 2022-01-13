import { useEffect, useState } from 'react';

/**
 * 即時反映される値をデバウンスします。
 * デバウンスされた値は、指定された期間 useDebounce フックが呼ばれなかった場合にのみ最新の値が反映されます。
 *
 * @param value デバウンスしたい値、
 * @param delay 反映されるまでの遅延時間。 ( ms )
 * @returns 指定時間後に変化した値。
 *
 * @example
 * // <input /> に入力した値が 1000ms 後にテキストへ反映される例。
 *
 * const [value, setValue] = useState('');
 * const debouncedValue = useDebounce(value, 1000);
 *
 * <input value={value} onChange={e => setValue(e.target.value)} />
 * <p>{debouncedValue}</p>
 */
export function useDebounce<T>(value: T, delay = 0) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debounceValue;
}
