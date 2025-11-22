import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';

type Props = {
  /**
   * スクロール操作の対象となるルート要素。
   * 未指定の場合は既定でブラウザのビューポート ( `window` )が使用されます。
   */
  rootRef?: RefObject<Element | null>;

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

type Selector = string | ((container: Element) => Element | null);

/**
 * スクロール処理完了時に呼び出すコールバック関数。
 */
type Callback = () => void;

/**
 * コンテナ要素のスクロールを外部から操作するのに使います。
 *
 * `scrollTo` の第二引数にコールバック関数を渡すことができます。
 * そのコールバック関数はスクロール処理完了時に呼び出されます。
 *
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 * const scrollTo = useScrollTo({ rootRef: ref });
 *
 * scrollTo('.foo');
 *
 * // #wrapper が root 要素
 * <div id="wrapper" ref={ref}>
 *   <div className=".foo"></div>
 * </div>
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
export function useScrollTo({ rootRef, offset = 0, behavior = 'smooth' }: Props) {
  const callbackRef = useRef<Callback>(null);

  const [to, setTo] = useState(Infinity);

  const scrollTo = useCallback(
    (selector: Selector, callback?: Callback) => {
      const root = rootRef?.current ?? window;

      const target =
        typeof selector === 'string'
          ? (root instanceof Window ? root.document.body : root).querySelector(selector)
          : selector(root instanceof Window ? root.document.body : root);
      if (!target) return;

      const to = target.getBoundingClientRect().top + scrollTopOf(root) - topOf(root) + offset;

      root.scrollTo({
        top: to,
        behavior,
      });

      setTo(to);
      callbackRef.current = callback ?? null;
    },
    [behavior, rootRef, offset],
  );

  useEffect(() => {
    const root = rootRef?.current ?? window;

    const onScroll = () => {
      if (scrollTopOf(root) === to && callbackRef.current) {
        root.removeEventListener('scroll', onScroll);
        setTo(Infinity);
        callbackRef.current();
      }
    };

    root.addEventListener('scroll', onScroll);

    return () => {
      root.removeEventListener('scroll', onScroll);
    };
  }, [rootRef, to]);

  return scrollTo;
}

function topOf(element: Element | Window) {
  return element instanceof Window ? 0 : element.getBoundingClientRect().top;
}

function scrollTopOf(element: Element | Window) {
  return element instanceof Window ? document.documentElement.scrollTop : element.scrollTop;
}
