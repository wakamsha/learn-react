import type { RefObject } from 'react';
import { useCallback, useEffect, useState } from 'react';

export function useShuffleLetters<T extends HTMLElement>(ref: RefObject<T>, duration = 800) {
  const [key, setKey] = useState(0);

  const [originStr, setOriginStr] = useState('');

  const start = useCallback((text: string) => {
    setOriginStr(text);
    setKey(state => state + 1);
  }, []);

  useEffect(() => {
    let id = 0;
    let running = true;

    if (ref?.current && originStr.length) {
      const randomIndexes = [...Array(originStr.length).keys()].reduce((assoc: number[], i) => {
        const rate = i / originStr.length;

        return [...assoc, Math.random() * (1 - rate) + rate];
      }, []);

      const startTime = new Date().getTime();

      id = window.requestAnimationFrame(() => onInterval());

      const onInterval = () => {
        if (!ref.current) return;

        const currentTime = new Date().getTime() - startTime;
        const percent = currentTime / duration;

        let letters = '';

        for (let i = 0; i < originStr.length; i++) {
          if (percent >= randomIndexes[i]) {
            letters += originStr.charAt(i);
          } else if (percent < randomIndexes[i] / 3) {
            letters += emptyChar;
          } else {
            letters += chars.charAt(Math.floor(Math.random() * chars.length));
          }
        }

        if (percent > 1) {
          letters = originStr;
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
  }, [duration, key, originStr, ref]);

  return [start];
}

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

const emptyChar = '-';
