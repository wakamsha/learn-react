/**
 * アプリケーション横断でユニークな文字列を生成します。
 */
export const makeId = (() => {
  let id = 0;
  return () => `id-${++id}`;
})();

/**
 * 有効なメールアドレスかどうかチェックします。
 *
 * @param value 入力文字列。
 * @returns 有効かどうか。
 */
export function isValidEmail(value: string): boolean {
  return !!value.match(/^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
}
