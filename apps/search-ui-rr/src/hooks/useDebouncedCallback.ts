import { useEffect, useMemo, useRef } from 'react';

/**
 * コールバックの実行をデバウンスする。
 * 最後の呼び出しから delay (ms) の間、再度呼び出されなければコールバックを実行する。
 *
 * @param callback - デバウンス対象のコールバック。
 *
 * @param delay - 実行までの遅延時間。 ( ms )
 */
export function useDebouncedCallback<Args extends unknown[]>(callback: (...args: Args) => void, delay: number) {
  const callbackRef = useRef(callback);
  // コールバックが変更された場合に、最新のコールバックを参照するようにする。
  callbackRef.current = callback;

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const memoizedCallback = useMemo(
    () =>
      (...args: Args) => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
          callbackRef.current(...args);
        }, delay);
      },
    [delay],
  );

  useEffect(
    () => () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    },
    [],
  );

  return memoizedCallback;
}
