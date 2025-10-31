import { useEffect, useMemo, useRef, type RefObject } from 'react';

type Props = {
  /**
   * ターゲットが見えるかどうかを確認するためのビューポートとして使用される要素。
   * 未指定の場合は既定でブラウザのビューポート ( document.body ) が使用されます。
   */
  rootRef?: RefObject<Element | null>;

  /**
   * ターゲット要素がコンテナ要素の境界を超えてからイベント発火するまでのオフセット値 ( px ) 。
   *
   * @default 0
   */
  offset?: number;
};

type Selector = string | ((container: Element | Document) => ArrayLike<Element>);

type Callback = (element: HTMLElement, index: number) => void;

/**
 * コンテナ要素のスクロール位置を監視し、
 * 任意の子要素のうちどの子要素がビューポート内でアクティブなのかを示すのに使います。
 *
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 * const spy = useSpy({ rootRef: ref });
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
export function useSpy({ rootRef, offset = 0 }: Props) {
  const selectorRef = useRef<Selector>(null);
  const callbackRef = useRef<Callback>(null);

  const spy = useMemo(
    () => (selector: Selector, callback?: Callback) => {
      selectorRef.current = selector;
      callbackRef.current = callback ?? null;
    },
    [],
  );

  useEffect(() => {
    const root = rootRef?.current ?? document;

    const selector = selectorRef.current;
    if (!selector) return;

    const onScroll = () => {
      if (!callbackRef.current) return;

      const targets = typeof selector === 'string' ? root.querySelectorAll(selector) : selector(root);

      let target: Element | undefined;

      const [newTarget, index] = findTargetByTopPosition(targets, topOf(root) - offset + 10);
      if (!newTarget || newTarget === target) return;

      target = newTarget;
      callbackRef.current(newTarget, index);
    };

    root.addEventListener('scroll', onScroll);

    return () => {
      root.removeEventListener('scroll', onScroll);
    };
  }, [offset, rootRef]);

  return spy;
}

function topOf(element: Element | Document) {
  return element instanceof Document ? 0 : element.getBoundingClientRect().top;
}

function findTargetByTopPosition(targets: ArrayLike<Element>, y: number) {
  for (let i = 0; i < targets.length; i++) {
    const { top } = targets[i].getBoundingClientRect();

    if (typeof top === 'number' && top >= y) {
      const index = i >= 1 ? i - 1 : 0;
      return [targets[index] as HTMLElement, index] as const;
    }
  }

  const index = targets.length - 1;

  return [targets[index] as HTMLElement | undefined, index] as const;
}
