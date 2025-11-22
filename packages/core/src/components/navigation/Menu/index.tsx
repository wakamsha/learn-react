import {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type DetailedHTMLProps,
  type Dispatch,
  type KeyboardEvent,
  type MouseEvent,
  type RefObject,
  type SetStateAction,
} from 'react';

type ButtonProps = {
  ref: RefObject<HTMLButtonElement | null>;
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
    onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
    tabIndex: number;
    role: 'menuitem';
    ref: RefObject<any>;
  }[];
  /**
   * `true` の場合、メニューは開いた状態となっている。
   */
  opened: boolean;
  /**
   * メニューの開閉状態を更新する。
   */
  setOpened: Dispatch<SetStateAction<boolean>>;
  moveFocus: (itemIndex: number) => void;
}>;

/**
 * リストボックスコンポーネントの動作とアクセシビリティの実装を提供します。
 * リストボックスにはオプションのリストが表示され、ユーザーは 1 つ以上のオプションを選択できます。
 *
 * @param itemCount - リストボックスに表示したいメニューの項目数。
 *
 * @param options   - リストボックスの振る舞いをカスタマイズするオプション。
 */
export function useDropdownMenu(itemCount: number, options?: DropdownMenuOptions): DropdownMenuResponse {
  const { onClickDisableFocusFirstItem = false, autoHide = true } = options ?? {};

  const [opened, setOpened] = useState(false);
  const currentFocusIndex = useRef(0);
  const firstRun = useRef(true);
  const clickedOpen = useRef(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useMemo(() => [...Array(itemCount).keys()].map(() => createRef<HTMLElement>()), [itemCount]);

  // キーボードイベントかどうかを判定する。
  const isKeyboardEvent = (event: KeyboardEvent | MouseEvent): event is KeyboardEvent => !!(event as KeyboardEvent).key;

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

    const handleEveryClick = (event: globalThis.MouseEvent) => {
      if (
        !(event.target instanceof Element) ||
        event.target.closest('[role="menu"]') instanceof Element ||
        event.target.closest('[aria-haspopup="true"][aria-expanded="true"]') === buttonRef.current
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
    const handleDisableArrowScroll = (event: globalThis.KeyboardEvent) => {
      if (opened && ['ArrowDown', 'ArrowUp'].includes(event.key)) {
        event.preventDefault();
      }
    };

    document.addEventListener('keydown', handleDisableArrowScroll);

    return () => {
      document.removeEventListener('keydown', handleDisableArrowScroll);
    };
  }, [opened]);

  const handleButton = useCallback(
    (event: KeyboardEvent | MouseEvent) => {
      if (isKeyboardEvent(event)) {
        if (!['Enter', ' ', 'Tab', 'ArrowDown', 'Escape'].includes(event.key)) return;

        if (['Tab', 'ArrowDown'].includes(event.key) && clickedOpen.current && opened) {
          event.preventDefault();
          moveFocus(0);
        }

        if (['Enter', ' '].includes(event.key)) {
          event.preventDefault();
          setOpened(true);
        }

        if (event.key === 'Escape') {
          event.preventDefault();
          setOpened(false);
        }

        return;
      }

      if (onClickDisableFocusFirstItem) {
        clickedOpen.current = !opened;
      }

      setOpened((state) => !state);
    },
    [moveFocus, opened, onClickDisableFocusFirstItem],
  );

  // メニュー項目で発火するキーボードイベントに基づいて実施する処理を定義する。
  const handleItemKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (['Tab', 'Shift', 'Enter', 'Escape', 'ArrowUp', 'ArrowDown', ' '].includes(event.key)) {
        switch (event.key) {
          case 'Escape':
            setOpened(false);
            buttonRef.current?.focus();
            break;
          case 'Tab':
            setOpened(false);
            break;
          case 'Enter':
            if (!['BUTTON', 'INPUT', 'A'].includes(event.currentTarget.nodeName)) {
              event.currentTarget.click();
            }
            if (autoHide) {
              setOpened(false);
            }
            break;
          case ' ':
            event.currentTarget.click();
            if (autoHide) {
              setOpened(false);
            }
            break;
        }

        let newFocusIndex = currentFocusIndex.current;
        if (event.key === 'ArrowUp') {
          newFocusIndex += newFocusIndex > 0 ? -1 : itemRefs.length - 1;
        } else if (event.key === 'ArrowDown') {
          newFocusIndex += newFocusIndex < itemRefs.length - 1 ? 1 : (itemRefs.length - 1) * -1;
        }
        moveFocus(newFocusIndex);

        return;
      }

      // 入力したキーの文字で始まるラベルのメニュー項目にフォーカスを移動する。
      if (/[\w!"#$%&'()*+,./:;<=>?@[\\-~]/.test(event.key)) {
        const index = itemRefs.findIndex(
          (ref) =>
            ref.current?.textContent.toLowerCase().startsWith(event.key.toLowerCase()) ??
            ref.current?.getAttribute('aria-label')?.toLowerCase().startsWith(event.key.toLowerCase()),
        );

        if (index !== -1) {
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
    itemProps: [...Array(itemCount).keys()].map((index) => ({
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
