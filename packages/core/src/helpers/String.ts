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

/**
 * 入力文字列の文字数をカウントします。
 *
 * @remarks
 * 改行文字とサロゲートペアは、それぞれ一文字としてカウントします。
 *
 * @param  {string} value 入力文字列
 * @return {number}     文字数
 */
export function count(value: string): number {
  if (!value) return 0;
  return (value.replace(/\r?\n/g, ' ').match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g) || []).length;
}
