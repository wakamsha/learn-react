import type { Dispatch, SetStateAction } from 'react';
import { useCallback, useState } from 'react';
import { useMounted } from '../useMounted';

export type TransactionStatus = Partial<{
  running: boolean;
  error: boolean;
}>;

type ErrorResult = {
  code: number;
  message: string;
  errors: Error[];
};

/**
 * 非同期処理をラップするカスタムフック。
 * Decorator の transaction の hooks 版（機能的には同じ）。
 *
 * @param onAction 非同期処理する関数
 * @param onError エラー時に実行する関数
 *
 * @example
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
