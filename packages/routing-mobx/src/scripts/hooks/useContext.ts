import { Context, useContext as useContextOrigin } from 'react';

/**
 * React 標準の useContext を拡張したもの。
 * こちらを使うと null チェックが不要となる。
 * @param context
 */
export function useContext<T>(context: Context<T | null>) {
  const value = useContextOrigin(context);
  if (!value) {
    throw new Error(`Need to pass a value to the context`);
  }
  return value;
}
