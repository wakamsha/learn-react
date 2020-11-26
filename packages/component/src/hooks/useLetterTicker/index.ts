import { RefObject, useCallback, useEffect, useState } from 'react';

export function useLetterTicker<T extends HTMLElement>(ref: RefObject<T>) {
  const [id, setId] = useState(0);

  const start = useCallback(() => setId(state => state + 1), []);

  useEffect(() => {
    let id = 0;
    let running = true;

    if (ref.current) {
      const originalStr = ref.current.innerText;

      const randomIndexes = [...Array(originalStr.length).keys()].reduce((assoc, i) => {
        const rate = i / originalStr.length;

        return [...assoc, Math.random() * (1 - rate) + rate];
      }, []);

      const startTime = new Date().getTime();

      id = window.requestAnimationFrame(() => onInterval());

      const onInterval = () => {
        if (!ref.current) return;

        const currentTime = new Date().getTime() - startTime;
        const percent = currentTime / duration;

        let letters = '';

        for (let i = 0; i < originalStr.length; i++) {
          if (percent >= randomIndexes[i]) {
            letters += originalStr.charAt(i);
          } else if (percent < randomIndexes[i] / 3) {
            letters += emptyChar;
          } else {
            letters += chars.charAt(Math.floor(Math.random() * chars.length));
          }
        }

        if (percent > 1) {
          letters = originalStr;
          running = false;
        }

        ref.current.innerHTML = letters;

        if (running) {
          id = window.requestAnimationFrame(() => onInterval());
        }
      };
    }

    return () => {
      running = false;
      window.cancelAnimationFrame(id);
    };
  }, [ref, id]);

  return [start];
}

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

const emptyChar = '-';

const duration = 1000;
