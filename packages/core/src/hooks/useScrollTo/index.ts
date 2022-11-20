import type { RefObject } from 'react';
import { useCallback } from 'react';

type Selector = string | ((container: Element) => Element | null);

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
  scrollBehavior?: 'auto' | 'smooth';
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
  const { offset = 0, scrollBehavior = 'smooth' } = option ?? {};

  const scrollTo = useCallback(
    (selector: Selector, callback?: () => void) => {
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
        behavior: scrollBehavior,
      });

      if (!callback) return;

      const onScroll = () => {
        if (scrollTopOf(container) === to) {
          container.removeEventListener('scroll', onScroll);
          callback();
        }
      };
      container.addEventListener('scroll', onScroll);
    },
    [containerRef, offset, scrollBehavior],
  );

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
