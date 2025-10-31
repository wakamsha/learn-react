import { useCallback, useEffect, useState, type RefObject } from 'react';

/**
 * 文字列をランダムにシャッフルしながら1文字ずつ表示します。
 *
 * @param ref      - シャッフルする対象となる DOM 要素
 *
 * @param duration - 文字列を表示し終わるまでの時間 (ms)
 */
export function useShuffleLetters<T extends HTMLElement>(ref: RefObject<T | null>, duration = 800) {
  const [key, setKey] = useState(0);

  const [originString, setOriginString] = useState('');

  const start = useCallback((text: string) => {
    setOriginString(text);
    setKey((state) => state + 1);
  }, []);

  useEffect(() => {
    let id = 0;
    let running = true;

    if (ref.current && originString.length > 0) {
      const randomIndexes = [...Array(originString.length).keys()].reduce((acc: number[], i) => {
        const rate = i / originString.length;

        return [...acc, Math.random() * (1 - rate) + rate];
      }, []);

      const startTime = Date.now();

      id = window.requestAnimationFrame(() => {
        onInterval();
      });

      const onInterval = () => {
        if (!ref.current) return;

        const currentTime = Date.now() - startTime;
        const percent = currentTime / duration;

        let letters = '';

        for (let i = 0; i < originString.length; i++) {
          if (percent >= randomIndexes[i]) {
            letters += originString.charAt(i);
          } else if (percent < randomIndexes[i] / 3) {
            letters += emptyChar;
          } else {
            letters += chars.charAt(Math.floor(Math.random() * chars.length));
          }
        }

        if (percent > 1) {
          letters = originString;
          running = false;
        }

        // oxlint-disable-next-line no-param-reassign
        ref.current.innerHTML = letters;

        if (running) {
          id = window.requestAnimationFrame(() => {
            onInterval();
          });
        }
      };
    }

    return () => {
      running = false;
      window.cancelAnimationFrame(id);
    };
  }, [duration, key, originString, ref]);

  return [start];
}

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

const emptyChar = '-';
