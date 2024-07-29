/**
 * 有効なメールアドレスかどうかチェックします。
 *
 * @param value - 入力文字列。
 *
 * @returns 有効かどうか。
 */
export function isValidEmail(value: string): boolean {
  return !!/^[\w!#$%&'*+./=?\\^`{|}~-]+@[\dA-Za-z-]+(?:\.[\dA-Za-z-]+)*$/.test(value);
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
  return (value.replaceAll(/\r?\n/g, ' ').match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g) ?? []).length;
}
