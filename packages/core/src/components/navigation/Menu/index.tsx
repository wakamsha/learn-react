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

type ButtonProps = {
  ref: RefObject<HTMLButtonElement>;
} & Pick<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  'onKeyDown' | 'onClick' | 'tabIndex' | 'role' | 'aria-haspopup' | 'aria-expanded'
>;

type DropdownMenuOptions = {
  onClickDisableFocusFirstItem?: boolean;
  /**
   * メニュー項目選択と同時にメニューを閉じるかどうか。
   *
   * @default true
   */
  autoHide?: boolean;
};

type DropdownMenuResponse = Readonly<{
  buttonProps: ButtonProps;
  itemProps: {
    onKeyDown: (e: KeyboardEvent<HTMLElement>) => void;
    tabIndex: number;
    role: 'menuitem';
    ref: RefObject<any>;
  }[];
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
  moveFocus: (itemIndex: number) => void;
}>;

export function useDropdownMenu(itemCount: number, options?: DropdownMenuOptions): DropdownMenuResponse {
  const { onClickDisableFocusFirstItem = false, autoHide = true } = options || {};

  const [opened, setOpened] = useState(false);
  const currentFocusIndex = useRef(0);
  const firstRun = useRef(true);
  const clickedOpen = useRef(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useMemo(() => [...Array(itemCount).keys()].map(() => createRef<HTMLElement>()), [itemCount]);

  // キーボードイベントかどうかを判定する。
  const isKeyboardEvent = (e: KeyboardEvent | MouseEvent): e is KeyboardEvent => !!(e as KeyboardEvent).key;

  // メニュー項目のフォーカスを移動する。
  const moveFocus = useCallback(
    (itemIndex: number) => {
      currentFocusIndex.current = itemIndex;
      itemRefs[itemIndex].current?.focus();
    },
    [itemRefs],
  );

  // メニューが開いたら最初の項目にフォーカスインする。
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }

    if (opened && !onClickDisableFocusFirstItem) {
      moveFocus(0);
    } else if (!opened) {
      clickedOpen.current = false;
    }
  }, [moveFocus, opened, onClickDisableFocusFirstItem]);

  // すべてのクリックイベントをリッスンし、クリック対象がメニュー領域外であれば強制的に閉じる。
  useEffect(() => {
    if (!opened) return;

    const handleEveryClick = (e: globalThis.MouseEvent) => {
      if (
        !(e.target instanceof Element) ||
        e.target === buttonRef.current ||
        e.target.closest('[role="menu"]') instanceof Element
      )
        return;
      setOpened(false);
    };

    document.addEventListener('click', handleEveryClick);

    return () => {
      document.removeEventListener('click', handleEveryClick);
    };
  }, [opened]);

  // メニュー表示中は十字キーによるページスクロールを抑止する。
  // これをやらないと十字キーでメニュー項目間を移動すると同時にページ全体もスクロールしてしまう。
  useEffect(() => {
    const handleDisableArrowScroll = (e: globalThis.KeyboardEvent) => {
      if (opened && ['ArrowDown', 'ArrowUp'].includes(e.key)) {
        e.preventDefault();
      }
    };

    document.addEventListener('keydown', handleDisableArrowScroll);

    return () => {
      document.removeEventListener('keydown', handleDisableArrowScroll);
    };
  }, [opened]);

  const handleButton = useCallback(
    (e: KeyboardEvent | MouseEvent) => {
      if (isKeyboardEvent(e)) {
        if (!['Enter', ' ', 'Tab', 'ArrowDown', 'Escape'].includes(e.key)) return;

        if (['Tab', 'ArrowDown'].includes(e.key) && clickedOpen.current && opened) {
          e.preventDefault();
          moveFocus(0);
        }

        if (['Enter', ' '].includes(e.key)) {
          e.preventDefault();
          setOpened(true);
        }

        if (e.key === 'Escape') {
          e.preventDefault();
          setOpened(false);
        }

        return;
      }

      if (onClickDisableFocusFirstItem) {
        clickedOpen.current = !opened;
      }

      setOpened(state => !state);
    },
    [moveFocus, opened, onClickDisableFocusFirstItem],
  );

  // メニュー項目で発火するキーボードイベントに基づいて実施する処理を定義する。
  const handleItemKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      if (['Tab', 'Shift', 'Enter', 'Escape', 'ArrowUp', 'ArrowDown', ' '].includes(e.key)) {
        switch (e.key) {
          case 'Escape':
            setOpened(false);
            buttonRef.current?.focus();
            break;
          case 'Tab':
            setOpened(false);
            break;
          case 'Enter':
            if (!['BUTTON', 'INPUT', 'A'].includes(e.currentTarget.nodeName)) {
              e.currentTarget.click();
            }
            if (autoHide) {
              setOpened(false);
            }
            break;
          case ' ':
            e.currentTarget.click();
            if (autoHide) {
              setOpened(false);
            }
            break;
        }

        let newFocusIndex = currentFocusIndex.current;
        if (e.key === 'ArrowUp') {
          newFocusIndex += newFocusIndex > 0 ? -1 : itemRefs.length - 1;
        } else if (e.key === 'ArrowDown') {
          newFocusIndex += newFocusIndex < itemRefs.length - 1 ? 1 : (itemRefs.length - 1) * -1;
        }
        moveFocus(newFocusIndex);

        return;
      }

      // 入力したキーの文字で始まるラベルのメニュー項目にフォーカスを移動する。
      if (/[a-zA-Z0-9./<>?;:"'`!@#$%^&*()\\[\]{}_+=|\\-~,]/.test(e.key)) {
        const index = itemRefs.findIndex(
          ref =>
            ref.current?.innerText.toLowerCase().startsWith(e.key.toLowerCase()) ||
            ref.current?.textContent?.toLowerCase().startsWith(e.key.toLowerCase()) ||
            ref.current?.getAttribute('aria-label')?.toLowerCase().startsWith(e.key.toLowerCase()),
        );

        if (index > -1) {
          moveFocus(index);
        }
      }
    },
    [autoHide, itemRefs, moveFocus],
  );

  return {
    buttonProps: {
      onKeyDown: handleButton,
      onClick: handleButton,
      tabIndex: 0,
      ref: buttonRef,
      role: 'button',
      'aria-haspopup': true,
      'aria-expanded': opened,
    },
    itemProps: [...Array(itemCount).keys()].map(index => ({
      onKeyDown: handleItemKeyDown,
      tabIndex: -1,
      role: 'menuitem',
      ref: itemRefs[index],
    })),
    opened,
    setOpened,
    moveFocus,
  };
}
