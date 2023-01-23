import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';

/**
 * 即時反映される値をデバウンスします。
 * デバウンスされた値は、指定された期間更新関数が実行されなかった場合にのみ最新の値が反映されます。
 *
 * @param value 初期値
 * @param delay 反映されるまでの遅延時間。 ( ms )
 * @returns
 * - 即時反映される値。
 * - 指定時間後に変化した値。
 * - 更新関数。
 *
 * @remarks
 * 遅延時間が明確でなく ( ≒ 明確にする必要がない ) React のレンダリングスケジュールに一任したい場合は
 * React 組み込みである {@link https://ja.reactjs.org/docs/hooks-reference.html#usedeferredvalue useDeferredValue} を使ってください。
 *
 * @example
 * `<input />` に入力した値が 1000ms 後にテキストへ反映される例。
 * ```tsx
 * const [value, debouncedValue, setValue] = useDebouncedState(value, 1000);
 *
 * <input value={value} onChange={e => setValue(e.target.value)} />
 * <p>{debouncedValue}</p>
 * ```
 */
export function useDebouncedState<T>(initialValue: T, delay = 0): Readonly<[T, T, Dispatch<SetStateAction<T>>]> {
  const [value, setValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return [value, debouncedValue, setValue] as const;
}
