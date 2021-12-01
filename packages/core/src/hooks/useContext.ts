import type { Context } from 'react';
import { useContext as useContextOrigin } from 'react';

/**
 * React 標準の useContext を拡張したもの。
 *
 * こちらを使うと参照する context object の存在が保証されるため、 利用側での存在チェックが不要となる。
 */
export function useContext<T>(context: Context<T | null>): T {
  const value = useContextOrigin(context);

  if (!value) {
    throw new Error('Need to pass a value to the context.');
  }

  return value;
}
