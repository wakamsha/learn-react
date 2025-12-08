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

type TriggerProps = {
  ref: RefObject<HTMLButtonElement | null>;
} & Required<
  Pick<
    DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    'onKeyDown' | 'onClick' | 'tabIndex' | 'role' | 'aria-haspopup' | 'aria-expanded'
  >
>;

type Response = Readonly<{
  /**
   * リストボックスの活性・非活性を制御する HTML 要素のプロパティとして利用されるオブジェクト。
   */
  triggerProps: TriggerProps;
  /**
   * リストボックスのメニュー項目として機能する HTML 要素のプロパティとして利用されるオブジェクトの配列。
   */
  itemProps: {
    /**
     * メニュー項目にフォーカスしてる最中にキーが入力された際のリストボックスメニューの振る舞いを管理します。
     */
    onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
    /**
     * ブラウザのネイティブフォーカスロジックを無効化するため `-1` を設定します。
     */
    tabIndex: -1;
    /**
     * WAI-ARIA ガイドラインに準拠するために `menuitem` を設定します。
     */
    role: 'menuitem';
    /**
     * 各メニュー項目に適用される RefObject。フォーカス処理を制御するために使用されます。
     */
    ref: RefObject<any>;
  }[];
  /**
   * リストボックスが活性化しているかどうかを示すブール値です。アプリケーション開発者はこの値を使用してメニューを表示するかどうかを設定します。
   */
  active: boolean;
  /**
   * アプリケーション開発者がプログラムの中でメニューの活性・非活性を制御するのに使います。
   */
  setActive: Dispatch<SetStateAction<boolean>>;
}>;

/**
 * リストボックスコンポーネントの動作とアクセシビリティの実装を提供します。
 * リストボックスにはオプションのリストが表示され、ユーザーは 1 つ以上のオプションを選択できます。
 *
 * @param itemCount - リストボックスに表示したいメニューの項目数。
 *
 * @todo
 * - disabled item をサポートする。
 * - autoInactive オプション。
 */
export function useListBox(itemCount: number): Response {
  const [active, setActive] = useState(false);

  const [focusIndex, setFocusIndex] = useState(0);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useMemo(() => [...Array(itemCount).keys()].map(() => createRef<HTMLElement>()), [itemCount]);

  // キーボードイベントかどうかを判定する。
  const isKeyboardEvent = (event: KeyboardEvent | MouseEvent): event is KeyboardEvent => !!(event as KeyboardEvent).key;

  /** メニュー項目のフォーカスを移動する。 */
  const moveFocus = useCallback(
    (itemIndex: number) => {
      setFocusIndex(itemIndex);
      itemRefs[itemIndex].current?.focus();
    },
    [itemRefs],
  );

  /**
   * メニュー項目の活性・非活性を切り替える。
   *
   * リストボックスが非表示のときは非活性にしておくことで、誤って選択イベントが発火するのを防げる。
   */
  const toggleItemsActivity = useCallback(
    (disabled: boolean) => {
      itemRefs.forEach((itemRef) => {
        if (disabled) {
          itemRef.current?.setAttribute('disabled', 'true');
        } else {
          itemRef.current?.removeAttribute('disabled');
        }
      });
    },
    [itemRefs],
  );

  const handleTrigger = useCallback(
    (event: KeyboardEvent<HTMLButtonElement> | MouseEvent<HTMLButtonElement>) => {
      if (isKeyboardEvent(event)) {
        if (![KeyMaps.ArrowDown, KeyMaps.Escape, KeyMaps.Enter, KeyMaps.Space, KeyMaps.Tab].includes(event.key)) return;

        if ([KeyMaps.ArrowDown, KeyMaps.Tab].includes(event.key) && active) {
          event.preventDefault();
          moveFocus(0);
        }

        if ([KeyMaps.Enter, KeyMaps.Space].includes(event.key)) {
          event.preventDefault();
          setActive(true);
        }

        if (event.key === KeyMaps.Escape) {
          event.preventDefault();
          setActive(false);
        }

        return;
      }

      setActive((active) => !active);
    },
    [active, moveFocus],
  );

  /** メニュー項目で発火するキーボードイベントに応じて実施する処理を定義する。 */
  const handleItemKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (Object.values(KeyMaps).includes(event.key)) {
        switch (event.key) {
          case KeyMaps.Escape:
            setActive(false);
            triggerRef.current?.focus();
            break;
          case KeyMaps.Tab:
            setActive(false);
            break;
          case KeyMaps.Enter:
            if (!['BUTTON', 'INPUT', 'A'].includes(event.currentTarget.nodeName)) {
              event.currentTarget.click();
            }
            setActive(false);
            break;
          case KeyMaps.Space:
            event.currentTarget.click();
            setActive(false);
            break;
        }

        const newFocusIndex = (() => {
          switch (event.key) {
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
      if (/[\w!"#$%&'()*+,./:;<=>?@[\\-~]/.test(event.key)) {
        const index = itemRefs.findIndex((ref) => {
          const key = event.key.toLowerCase();
          return (
            ref.current?.textContent.toLowerCase().startsWith(key) ??
            ref.current?.getAttribute('aria-label')?.toLowerCase().startsWith(key)
          );
        });

        if (index !== -1) {
          moveFocus(index);
        }
      }
    },
    [focusIndex, itemRefs, moveFocus],
  );

  // リストボックス表示・非表示時に実行する処理。
  useEffect(() => {
    if (active) {
      // リストボックスが開いたら全てのメニュー項目を活性化する。
      toggleItemsActivity(false);
      // リストボックスが開いたら最初のメニュー項目にフォーカスインする。
      // eslint-disable-next-line react-hooks/set-state-in-effect
      moveFocus(0);
    } else {
      // リストボックスが閉じたら全てのメニュー項目を非活性化する。
      // メニューの選択イベント発火後に実行するためにワンテンポ遅らせる。
      requestAnimationFrame(() => {
        toggleItemsActivity(true);
      });
    }
  }, [moveFocus, active, toggleItemsActivity]);

  // すべてのクリックイベントをリッスンし、クリック対象がメニュー領域外であれば強制的に閉じる。
  useEffect(() => {
    if (!active) return;

    const handleEveryClick = (event: globalThis.MouseEvent) => {
      if (
        !(event.target instanceof Element) ||
        event.target.closest('[role="menu"]') instanceof Element ||
        event.target.closest('[aria-haspopup="true"][aria-expanded="true"]') === triggerRef.current
      )
        return;

      setActive((active) => !active);
    };

    document.addEventListener('click', handleEveryClick);

    return () => {
      document.removeEventListener('click', handleEveryClick);
    };
  }, [active]);

  // リストボックス表示中は矢印キーによるページスクロールを抑止する。
  // これをやらないと矢印キーでメニュー項目間を移動すると同時にページ全体もスクロールしてしまう。
  useEffect(() => {
    const handleDisableArrowScroll = (event: globalThis.KeyboardEvent) => {
      if (active && [KeyMaps.ArrowDown, KeyMaps.ArrowUp].includes(event.key)) {
        event.preventDefault();
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
    itemProps: [...Array(itemCount).keys()].map((index) => ({
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
