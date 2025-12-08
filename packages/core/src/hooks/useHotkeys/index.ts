import hotkeys, { type HotkeysEvent, type KeyHandler } from 'hotkeys-js';
import { useCallback, useEffect, useRef, type RefObject } from 'react';

type Options = {
  /**
   * hotkeys を有効にするかどうか。
   *
   * @default true
   */
  enabled?: boolean;
  /**
   * コールバックを実行するキーイベント。
   *
   * @default 'keydown'
   */
  trigger?: 'keydown' | 'keyup';
};

/**
 * キーボードショートカットを定義します。
 *
 * @param keys
 * リッスンするキーストローク。単一または修飾キーとの組み合わせを指定します。
 * 詳細は [hotkey-js の README](https://github.com/jaywcjlove/hotkeys/#defining-shortcuts) を参照ください。
 *
 * @param callback - 指定のキーストロークが入力されたときに実行する関数。
 *
 * @param options  - 振る舞いをカスタマイズするオプション。
 *
 * @returns RefObject を返します。これを JSX に渡すと、その要素にフォーカス中のときのみ hotkeys が有効となります。
 */
export function useHotkeys<T extends Element>(
  keys: string,
  callback: KeyHandler,
  options?: Options,
): RefObject<T | null> {
  const { enabled = true, trigger = 'keydown' } = options ?? {};

  const ref = useRef<T>(null);

  const handler = useCallback(
    (keyboardEvent: KeyboardEvent, hotkeysEvent: HotkeysEvent) => {
      if (ref.current === null || document.activeElement === ref.current) {
        callback(keyboardEvent, hotkeysEvent);
      }
    },
    [callback],
  );

  useEffect(() => {
    if (!enabled) {
      hotkeys.unbind(keys, handler);
      return;
    }

    hotkeys(keys, { keydown: trigger === 'keydown', keyup: trigger === 'keyup' }, handler);

    return () => {
      hotkeys.unbind(keys, handler);
    };
  }, [enabled, handler, keys, trigger]);

  return ref;
}

// デフォルトでは、hotkeys は input, select, textarea に対し無効化されてるため、これを有効化する。
hotkeys.filter = () => true;
