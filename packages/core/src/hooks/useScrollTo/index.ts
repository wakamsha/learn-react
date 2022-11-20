import type { RefObject } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

type Selector = string | ((container: Element) => Element | null);

type Callback = () => void;

type Option = {
  /**
   * コンテナ要素のスクロールの停止位置を調整するのに使います ( px )。
   * マイナス値を指定すると本来の位置よりも手前で停止します。
   *
   * @default 0
   */
  offset?: number;
  /**
   * スクロールの振る舞いを設定します。
   *
   * - `auto`: スクロールするボックスは瞬時にスクロールします。
   * - `smooth`: スクロールするボックスはアニメーションを伴ってスムーズにスクロールします。
   *
   * @default 'smooth'
   */
  behavior?: 'auto' | 'smooth';
};

/**
 * コンテナ要素のスクロールを外部から操作するのに使います。
 *
 * @param containerRef 操作対象となるコンテナ要素
 * @param option
 *
 * @example
 * ```tsx
 * const scrollTo = useScrollTo(containerRef);
 * scrollTo('.foo');
 * ```
 *
 * ```text
 * +-container-----+     +---------------+
 * |               |     | +-----------+ |
 * |       ^       |     | | .foo      | |
 * |       |       |     | +-----------+ |
 * |       |       |     |               |
 * | +-----+-----+ |     |               |
 * | | .foo      | |     |               |
 * | +-----------+ |     |               |
 * +---------------+     +---------------+
 * ```
 */
export function useScrollTo(containerRef: RefObject<Element | Window | null>, option?: Option) {
  const { offset = 0, behavior = 'smooth' } = option ?? {};

  const [to, setTo] = useState(Infinity);
  const callbackRef = useRef<Callback>();

  const scrollTo = useCallback(
    (selector: Selector, callback?: Callback) => {
      const container = containerRef.current;
      if (!container) return;

      const target =
        typeof selector === 'string'
          ? (container instanceof Window ? container.document.body : container).querySelector(selector)
          : selector(container instanceof Window ? container.document.body : container);
      if (!target) return;

      const to = target.getBoundingClientRect().top + scrollTopOf(container) - topOf(container) + offset;

      container.scrollTo({
        top: to,
        behavior,
      });

      setTo(to);
      callbackRef.current = callback;
    },
    [behavior, containerRef, offset],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onScroll = () => {
      if (scrollTopOf(container) === to && callbackRef.current) {
        container.removeEventListener('scroll', onScroll);
        setTo(Infinity);
        callbackRef.current();
      }
    };

    container.addEventListener('scroll', onScroll);

    return () => {
      container.removeEventListener('scroll', onScroll);
    };
  }, [containerRef, to]);

  return scrollTo;
}

function topOf(e: Element | Window) {
  return e instanceof Window ? 0 : e.getBoundingClientRect().top;
}

function scrollTopOf(e: Element | Window) {
  if (e instanceof Window) {
    return document.documentElement.scrollTop || document.body.scrollTop;
  }

  return e.scrollTop;
}
