/**
 * 有効なメールアドレスかどうかチェックします。
 *
 * @param value - 入力文字列。
 *
 * @returns 有効かどうか。
 */
export function isValidEmail(value: string): boolean {
  return !!value.match(/^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
}

/**
 * 入力文字列の文字数をカウントします。
 *
 * @param value - 入力文字列
 *
 * @returns 文字数
 *
 * @remarks
 * 改行文字とサロゲートペアは、それぞれ一文字としてカウントします。
 */
export function count(value: string): number {
  if (!value) return 0;
  return (value.replace(/\r?\n/g, ' ').match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g) ?? []).length;
}
