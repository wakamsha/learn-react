import { useEffect, useMemo, useRef, useState } from 'react';

type Container = Element | Window | null;

type Selector = string | ((container: Element) => ArrayLike<Element>);

type Callback = (element: HTMLElement, index: number) => void;

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
 * const spy = useSpy();
 *
 * // #wrapper が container 要素
 * <div
 *   id="wrapper"
 *   ref={spy('.foo', (el, i) => {
 *     console.log(`${i} 番目のターゲット要素 .foo がスクロールによって #wrapper の境界を超えました`, el);
 *   })}
 * >
 *   <div className=".foo"></div>
 *   <div className=".bar"></div>
 *   <div className=".foo"></div>
 * </div>
 * ```
 */
export function useSpy(offset = 0) {
  const [container, setContainer] = useState<Container>(null);

  const containerRef = useRef<Container>(null);
  const selectorRef = useRef<Selector>();
  const callbackRef = useRef<Callback>();

  const spy = useMemo(() => {
    const spy = (selector: Selector, callback?: Callback) => {
      selectorRef.current = selector;
      callbackRef.current = callback;

      return (element: Container) => {
        if (!element) return;

        setContainer(element);
        containerRef.current = element;
      };
    };
    spy.ref = containerRef;

    return spy;
  }, []);

  const targetRef = useRef<Element>();

  useEffect(() => {
    if (!container) return;

    const selector = selectorRef.current;
    if (!selector) return;

    const onScroll = () => {
      if (!callbackRef.current) return;

      const targets =
        typeof selector === 'string'
          ? (container instanceof Window ? container.document.body : container).querySelectorAll(selector)
          : selector(container instanceof Window ? container.document.body : container);
      if (!targets) return;

      const [newTarget, index] = findTargetByTopPosition(targets, topOf(container) - offset + 10);
      if (!newTarget || newTarget === targetRef.current) return;

      targetRef.current = newTarget;
      callbackRef.current(newTarget, index);
    };

    container.addEventListener('scroll', onScroll);

    return () => {
      container.removeEventListener('scroll', onScroll);
    };
  }, [container, offset]);

  return spy;
}

function topOf(e: Element | Window) {
  return e instanceof Window ? 0 : e.getBoundingClientRect().top;
}

function findTargetByTopPosition(targets: ArrayLike<Element>, y: number) {
  for (let i = 0; i < targets.length; i++) {
    const top = targets[i]?.getBoundingClientRect().top;

    if (typeof top === 'number' && top >= y) {
      const index = i >= 1 ? i - 1 : 0;
      return [targets[index] as HTMLElement, index] as const;
    }
  }

  const index = targets.length - 1;

  return [targets[index] as HTMLElement | undefined, index] as const;
}
