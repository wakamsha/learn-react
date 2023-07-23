import { useCallback, useState, type Dispatch, type SetStateAction } from 'react';
import { useMounted } from '../useMounted';

/**
 * 非同期処理をしている最中とその前後の状態を表す。
 *
 * @remarks
 * 一度も実行していない場合は `{ running: undefined, error: undefined }` となります。
 */
export type TransactionStatus = {
  /**
   * `true` の場合は非同期処理が実行中である。
   */
  running?: boolean;
  /**
   * 非同期処理中にエラーが発生すると `true` となる。
   * 非同期処理が成功で終わると `false` となる。
   */
  error?: boolean;
};

type ErrorResult = {
  /**
   * エラーの種別を分類するためのコード。
   */
  code: number;
  /**
   * エラーの概要を説明するメッセージ文。
   */
  message: string;
  /**
   * 発生したエラーの詳細一覧。
   */
  errors: Error[];
};

/**
 * 非同期処理をラップするカスタムフック。
 * Decorator の transaction の hooks 版（機能的には同じ）。
 *
 * @param onAction - 非同期処理する関数
 *
 * @param onError  - エラー時に実行する関数
 *
 * @example
 * ```
 * const fooStore = useContext(FooStore.Context);
 *
 * const [handler, status] = useTransaction(
 *   useCallback(async () => {
 *     await fooStore.loadAsync();
 *   }, []),
 *   useCallback(e => {
 *     console.error(e.message);
 *   }, []),
 * );
 * ```
 */
export function useTransaction<T extends any[]>(
  onAction: (...args: T) => Promise<void>,
  onError?: (error: ErrorResult) => void,
): [(...args: T) => Promise<void>, TransactionStatus, Dispatch<SetStateAction<TransactionStatus>>] {
  const [status, setStatus] = useState<TransactionStatus>({});

  const mounted = useMounted();

  const handler = useCallback(
    async (...args: T) => {
      try {
        setStatus({ running: true, error: false });

        await onAction(...args);

        if (mounted.current) {
          setStatus({ running: false, error: false });
        }
      } catch (error) {
        console.error('useTransaction', error);

        onError?.(error as ErrorResult);

        if (mounted.current) {
          setStatus({ running: false, error: true });
        }

        throw error;
      }
    },
    [mounted, onAction, onError],
  );

  return [handler, status, setStatus];
}
