import { useContext as useContextOrigin, type Context } from 'react';

/**
 * React 標準の useContext を拡張したもの。
 *
 * こちらを使うと参照する context object の存在が保証されるため、 利用側での存在チェックが不要となる。
 *
 * @param context - createContext で作成したコンテキスト。コンテキスト自体は情報を保持するのではなく、コンポーネントから提供または読み取りできる情報の種類を表すだけです。
 */
export function useContext<T>(context: Context<T | null>): T {
  const value = useContextOrigin(context);

  if (!value) {
    throw new Error('Need to pass a value to the context.');
  }

  return value;
}
