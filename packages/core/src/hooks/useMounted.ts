import { useEffect, useRef } from 'react';

/**
 * コンポーネントがマウントされているかどうかチェックする
 *
 * @returns マウントされていれば true
 *
 * @example
 * const mounted = useMounted();
 *
 * if (mounted.current) {
 *   foo();
 * } else {
 *   bar();
 * }
 */
export function useMounted() {
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
    };
  }, []);

  return mounted;
}
