import type { MutableRefObject } from 'react';
import { useEffect, useMemo, useRef } from 'react';

type Root = Element | Document | null;

type Selector = string | ((rootElement: Element) => ArrayLike<Element>);

type Callback = (element: HTMLElement, index: number) => void;

type Spy = (selector: Selector, callback?: Callback) => void;

/**
 * コンテナ要素のスクロール位置を監視し、
 * 任意の子要素のうちどの子要素がビューポート内でアクティブなのかを示すのに使います。
 *
 * 監視する対象の `container` 要素は、戻り値である関数の戻り値の `ref` に設定します。
 *
 * @remarks
 * Element ref の代わりに `window` を渡すと `document.body` のスクロールを監視します。
 *
 * @param offset ターゲット要素がコンテナ要素の境界を超えてからイベント発火するまでのオフセット値 ( px ) 。
 *
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 * const spy = useSpy(ref);
 *
 * spy('.foo', (el, i) => {
 *   console.log(`${i} 番目のターゲット要素 .foo がスクロールによって #wrapper の境界を超えました`, el);
 * });
 *
 * // #wrapper が Root 要素
 * <div id="wrapper" ref={ref}>
 *   <div className=".foo"></div>
 *   <div className=".bar"></div>
 *   <div className=".foo"></div>
 * </div>
 * ```
 */
export function useSpy(rootRef: MutableRefObject<Root>, offset = 0): Spy {
  const selectorRef = useRef<Selector>();
  const callbackRef = useRef<Callback>();

  const spy = useMemo<Spy>(
    () => (selector: Selector, callback?: Callback) => {
      selectorRef.current = selector;
      callbackRef.current = callback;
    },
    [],
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const selector = selectorRef.current;
    if (!selector) return;

    const targets =
      typeof selector === 'string'
        ? (root instanceof Document ? root.body : root).querySelectorAll(selector)
        : selector(root instanceof Document ? root.body : root);

    const options: IntersectionObserverInit = {
      root,
      rootMargin: `${offset}px 0px -100%`,
    };

    const observer = new IntersectionObserver(entries => {
      const index = entries.findIndex(entry => entry.isIntersecting);
      if (index > -1 && callbackRef.current) {
        callbackRef.current(entries[index].target as HTMLElement, index);
      }
    }, options);

    Array.from(targets).forEach(content => {
      observer.observe(content);
    });

    return () => {
      observer.disconnect();
    };
  }, [offset, rootRef]);

  return spy;
}
