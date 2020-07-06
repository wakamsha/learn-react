import { useCallback, useState } from 'react';
import { useMounted } from './useMounted';

export type TransactionStatus = Partial<{
  running: boolean;
  error: boolean;
}>;

/**
 * Decorator の transaction の hooks 版（機能的には同じ）
 *
 * @param fn 非同期処理する関数
 * @example
 * const fooStore = useContext(FooStore.Context);
 *
 * const { status, handler } = useTransaction(
 *   useCallback(async () => {
 *     await fooStore.loadAsync();
 *   }, [fooStore]),
 * );
 */
export function useTransaction<T extends any[]>(fn: (...args: T) => Promise<void>) {
  const [status, setStatus] = useState<TransactionStatus>({});

  const mounted = useMounted();

  const handler = useCallback(
    async (...args: T) => {
      try {
        setStatus({ running: true, error: false });

        await fn(...args);

        if (mounted.current) {
          setStatus({ running: false, error: false });
        }
      } catch (e) {
        console.error(`@transaction`, e);
        if (mounted.current) {
          setStatus({ running: false, error: true });
        }
      }
    },
    [fn, mounted],
  );

  return { status, setStatus, handler };
}
