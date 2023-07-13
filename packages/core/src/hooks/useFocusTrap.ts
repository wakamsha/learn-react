import { useCallback, useEffect, useRef, type RefObject } from 'react';

/**
 * Tab キーによるフォーカス移動のスコープを任意の DOM 配下に限定します。
 *
 * モーダル表示中にフォーカスが外に移動するのを防ぐのに役立ちます。
 *
 * @param active - フォーカストラップの有効・無効を切り替える。
 *
 * @returns      フォーカストラップのスコープとなる DOM の RefObject.
 */
export function useFocusTrap<T extends HTMLElement>(active: boolean): RefObject<T> {
  const targetRef = useRef<T>(null);

  /**
   * Tab キーによるフォーカス移動のスコープを任意の DOM 配下に限定する。
   */
  const retainFocus = useCallback(
    (e: KeyboardEvent) => {
      if (!targetRef.current) return;

      const focusableNodes = getFocusableNodes(targetRef.current).filter((node) => node.offsetParent !== null);

      if (!focusableNodes.length) return;

      if (!targetRef.current.contains(document.activeElement)) {
        focusableNodes[0].focus();
      } else {
        const focusedItemIndex = focusableNodes.indexOf(document.activeElement as HTMLElement);

        if (e.shiftKey && focusedItemIndex === 0) {
          focusableNodes[focusableNodes.length - 1].focus();
          e.preventDefault();
        }

        if (!e.shiftKey && focusableNodes.length > 0 && focusedItemIndex === focusableNodes.length - 1) {
          focusableNodes[0].focus();
          e.preventDefault();
        }
      }
    },
    [targetRef],
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        retainFocus(e);
      }
    },
    [retainFocus],
  );

  useEffect(() => {
    if (active) {
      document.addEventListener('keydown', onKeyDown);
      (document.activeElement as HTMLElement)?.blur();
    }

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown, retainFocus, active]);

  return targetRef;
}

/**
 * 任意の DOM をスコープとし、その配下にあるフォーカス可能な DOM 要素を取得します。
 *
 * @param scopeElement - スコープとなる DOM 要素
 *
 * @returns            フォーカス可能な DOM 要素配列
 */
function getFocusableNodes(scopeElement: HTMLElement): HTMLElement[] {
  const nodes = scopeElement.querySelectorAll(focusableElements.join(','));

  return Array(...nodes) as HTMLElement[];
}

/**
 * Tab キーでフォーカス可能な DOM セレクタ一覧
 */
const focusableElements = [
  'a[href]',
  'area[href]',
  'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
  'select:not([disabled]):not([aria-hidden])',
  'textarea:not([disabled]):not([aria-hidden])',
  'button:not([disabled]):not([aria-hidden])',
  'iframe',
  'object',
  'embed',
  '[contenteditable]',
  '[tabindex]:not([tabindex^="-"])',
] as const;
