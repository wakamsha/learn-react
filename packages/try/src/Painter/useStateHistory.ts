import { useCallback, useState } from 'react';

type ReturnType<T> = {
  /**
   * 場j帯の履歴を保持する配列。
   */
  history: T[];
  /**
   * 現在の履歴インデックス
   */
  historyIndex: number;
  /**
   * 現在の状態。
   */
  currentState: T;
  /**
   * 新しい状態を履歴に追加する関数。
   *
   * @param newState - 新しい状態。
   */
  pushState: (newState: T) => void;
  /**
   * 履歴を戻す関数。
   */
  undo: () => void;
  /**
   * 履歴を進める関数。
   */
  redo: () => void;
  /**
   * 履歴をリセットする関数。
   */
  reset: () => void;
};

/**
 * 履歴管理機能を提供するカスタムフック。
 *
 * このフックは、状態の履歴を保持し、`undo` や `redo` 操作を簡単に実装するために使用します。
 *
 * @template T - 管理する状態の型。
 *
 * @param initialState - 初期状態。
 *
 * @example
 * ```typescript
 * const { history, historyIndex, currentState, pushState, undo, redo } = useStateHistory(0);
 *
 * // 状態を更新
 * pushState(1);
 * pushState(2);
 *
 * // 履歴を戻す
 * undo();
 * console.log(currentState); // 1
 *
 * // 履歴を進める
 * redo();
 * console.log(currentState); // 2
 * ```
 */
export function useStateHistory<T>(initialState: T): ReturnType<T> {
  const [history, setHistory] = useState([initialState]);

  const [historyIndex, setHistoryIndex] = useState(0);

  const pushState = useCallback(
    (newState: T) => {
      setHistory((previousHistories) => {
        const newHistories = [...previousHistories.slice(0, historyIndex + 1), newState];
        setHistoryIndex(newHistories.length - 1);
        return newHistories;
      });
    },
    [historyIndex],
  );

  const updateHistoryIndex = useCallback(
    (historyIndex: number) => {
      if (historyIndex < 0) {
        console.warn('負の値は設定できません。');
        return;
      }
      if (historyIndex >= history.length) {
        console.warn('履歴以上のindexは設定できません。');
        return;
      }
      setHistoryIndex(historyIndex);
    },
    [history.length],
  );

  const undo = useCallback(() => {
    updateHistoryIndex(historyIndex - 1);
  }, [updateHistoryIndex, historyIndex]);

  const redo = useCallback(() => {
    updateHistoryIndex(historyIndex + 1);
  }, [updateHistoryIndex, historyIndex]);

  const reset = useCallback(() => {
    setHistory([initialState]);
    setHistoryIndex(0);
  }, [initialState]);

  return {
    history,
    historyIndex,
    currentState: history[historyIndex],
    pushState,
    undo,
    redo,
    reset,
  };
}
