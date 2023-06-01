import { useEffect, useRef, type RefObject } from 'react';

/**
 * ある要素の領域外をクリックしたイベントを検知します。
 *
 * @param callback - 領域外をクリックした時に発火するコールバック関数
 * @param enabled - 有効化フラグ ( default: true )
 *
 * @returns 領域（起点）となる要素。
 *
 * @example
 * ```tsx
 * const ref = useClickOutside<HTMLDivElement>(() => {
 *   console.info('clicked outside!');
 * });
 *
 * return <div ref={ref}>Inner area</div>;
 * ```
 */
export function useClickOutside<T extends HTMLElement>(
  callback: (event: MouseEvent) => void,
  enabled = true,
): RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const args = [
      'click',
      (event: MouseEvent) => {
        !ref.current?.contains(event.target as HTMLElement) && callback(event);
      },
    ] as const;

    if (enabled) {
      document.addEventListener(...args);
    }

    return () => {
      document.removeEventListener(...args);
    };
  }, [callback, enabled]);

  return ref;
}
