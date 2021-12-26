import type { Dispatch, KeyboardEvent, RefObject, SetStateAction } from 'react';
import { createRef, useCallback, useEffect, useMemo, useState } from 'react';

type Response = Readonly<{
  itemProps: {
    onKeyDown: (e: KeyboardEvent<HTMLElement>) => void;
    tabIndex: -1;
    role: 'menuitem';
    ref: RefObject<any>;
  }[];
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
}>;

export function useListBox(itemCount: number): Response {
  const [active, setActive] = useState(false);

  const [focusIndex, setFocusIndex] = useState(0);

  const itemRefs = useMemo(() => [...Array(itemCount).keys()].map(() => createRef<HTMLElement>()), [itemCount]);

  /** メニュー項目のフォーカスを移動する。 */
  const moveFocus = useCallback(
    (itemIndex: number) => {
      setFocusIndex(itemIndex);
      itemRefs[itemIndex].current?.focus();
    },
    [itemRefs],
  );

  /** メニュー項目で発火するキーボードイベントに応じて実施する処理を定義する。 */
  const handleItemKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      if (Object.values(KeyMaps).includes(e.key)) {
        switch (e.key) {
          case KeyMaps.Escape:
            setActive(false);
            break;
          case KeyMaps.Tab:
            setActive(false);
            break;
          case KeyMaps.Enter:
            if (!['BUTTON', 'INPUT', 'A'].includes(e.currentTarget.nodeName)) {
              e.currentTarget.click();
            }
            setActive(false);
            break;
          case KeyMaps.Space:
            e.currentTarget.click();
            setActive(false);
            break;
        }
      }

      const newFocusIndex = (() => {
        switch (e.key) {
          case KeyMaps.ArrowUp:
            return focusIndex + (focusIndex > 0 ? -1 : itemRefs.length - 1);
          case KeyMaps.ArrowDown:
            return focusIndex + (focusIndex < itemRefs.length - 1 ? 1 : (itemRefs.length - 1) * -1);
          default:
            return focusIndex;
        }
      })();
      moveFocus(newFocusIndex);
    },
    [focusIndex, itemRefs.length, moveFocus],
  );

  // メニューが開いたら最初の項目にフォーカスインする。
  useEffect(() => {
    if (active) {
      moveFocus(0);
    }
  }, [moveFocus, active]);

  // すべてのクリックイベントをリッスンし、クリック対象がメニュー領域外であれば強制的に閉じる。
  useEffect(() => {
    if (!active) return;

    const handleEveryClick = (e: globalThis.MouseEvent) => {
      if (!(e.target instanceof Element) || e.target.closest('[role="menu"]') instanceof Element) return;
      setActive(false);
    };

    document.addEventListener('click', handleEveryClick);

    return () => {
      document.removeEventListener('click', handleEveryClick);
    };
  }, [active]);

  // メニュー表示中は矢印キーによるページスクロールを抑止する。
  // これをやらないと矢印キーでメニュー項目間を移動すると同時にページ全体もスクロールしてしまう。
  useEffect(() => {
    const handleDisableArrowScroll = (e: globalThis.KeyboardEvent) => {
      if (active && [KeyMaps.ArrowDown, KeyMaps.ArrowUp].includes(e.key)) {
        e.preventDefault();
      }
    };

    document.addEventListener('keydown', handleDisableArrowScroll);

    return () => {
      document.removeEventListener('keydown', handleDisableArrowScroll);
    };
  }, [active]);

  return {
    active,
    setActive,
    itemProps: [...Array(itemCount).keys()].map(index => ({
      onKeyDown: handleItemKeyDown,
      tabIndex: -1,
      role: 'menuitem',
      ref: itemRefs[index],
    })),
  };
}

const KeyMaps = {
  Tab: 'Tab',
  Shift: 'Shift',
  Enter: 'Enter',
  Escape: 'Escape',
  ArrowUp: 'ArrowUp',
  ArrowDown: 'ArrowDown',
  Space: ' ',
};
