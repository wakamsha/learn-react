import type {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  Dispatch,
  KeyboardEvent,
  MouseEvent,
  RefObject,
  SetStateAction,
} from 'react';
import { createRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';

type TriggerProps = {
  ref: RefObject<HTMLButtonElement>;
} & Pick<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  'onKeyDown' | 'onClick' | 'tabIndex' | 'role' | 'aria-haspopup' | 'aria-expanded'
>;

type Response = Readonly<{
  triggerProps: TriggerProps;
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

  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useMemo(() => [...Array(itemCount).keys()].map(() => createRef<HTMLElement>()), [itemCount]);

  // キーボードイベントかどうかを判定する。
  const isKeyboardEvent = (e: KeyboardEvent | MouseEvent): e is KeyboardEvent => !!(e as KeyboardEvent).key;

  /** メニュー項目のフォーカスを移動する。 */
  const moveFocus = useCallback(
    (itemIndex: number) => {
      setFocusIndex(itemIndex);
      itemRefs[itemIndex].current?.focus();
    },
    [itemRefs],
  );

  const handleTrigger = useCallback(
    (e: KeyboardEvent<HTMLButtonElement> | MouseEvent<HTMLButtonElement>) => {
      if (isKeyboardEvent(e)) {
        if (![KeyMaps.ArrowDown, KeyMaps.Escape, KeyMaps.Enter, KeyMaps.Space, KeyMaps.Tab].includes(e.key)) return;

        if ([KeyMaps.ArrowDown, KeyMaps.Tab].includes(e.key) && active) {
          e.preventDefault();
          moveFocus(0);
        }

        if ([KeyMaps.Enter, KeyMaps.Space].includes(e.key)) {
          e.preventDefault();
          setActive(true);
        }

        if (e.key === KeyMaps.Escape) {
          e.preventDefault();
          setActive(false);
        }

        return;
      }

      setActive(active => !active);
    },
    [active, moveFocus],
  );

  /** メニュー項目で発火するキーボードイベントに応じて実施する処理を定義する。 */
  const handleItemKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      if (Object.values(KeyMaps).includes(e.key)) {
        switch (e.key) {
          case KeyMaps.Escape:
            setActive(false);
            triggerRef.current?.focus();
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

        return;
      }

      // 入力したキーの文字で始まるラベルのメニュー項目にフォーカスを移動する。
      if (/[a-zA-Z0-9./<>?;:"'`!@#$%^&*()\\[\]{}_+=|\\-~,]/.test(e.key)) {
        const index = itemRefs.findIndex(ref => {
          const key = e.key.toLowerCase();
          return (
            ref.current?.innerText.toLowerCase().startsWith(key) ||
            ref.current?.textContent?.toLowerCase().startsWith(key) ||
            ref.current?.getAttribute('aria-label')?.toLowerCase().startsWith(key)
          );
        });

        if (index > -1) {
          moveFocus(index);
        }
      }
    },
    [focusIndex, itemRefs, moveFocus],
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
    triggerProps: {
      onClick: handleTrigger,
      onKeyDown: handleTrigger,
      tabIndex: 0,
      ref: triggerRef,
      role: 'button',
      'aria-haspopup': true,
      'aria-expanded': active,
    },
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
