import { useEffect, useRef, type RefObject } from 'react';

/**
 * ある要素の領域外をクリックしたイベントを検知します。
 *
 * @param callback - 領域外をクリックした時に発火するコールバック関数
 *
 * @param enabled  - 有効化フラグ ( default: true )
 *
 * @returns        領域（起点）となる要素。
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
  callback: (event: Event) => void,
  enabled = true,
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const listener = (event: Event) => {
      if (!ref.current?.contains(event.target as HTMLElement)) {
        callback(event);
      }
    };

    if (enabled) {
      document.addEventListener('click', listener);
      document.addEventListener('touchstart', listener);
    }

    return () => {
      document.removeEventListener('click', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [callback, enabled]);

  return ref;
}
