/**
 * 渡された値が存在するものかどうかを判定します。
 *
 * Array.prototype.filter と組み合わせると、配列から `null` と `undefined` を取り除くことができます。
 *
 * @param value 判定する値
 *
 * @example
 * ```ts
 * const ary = ['🍎', undefined, '🍊', null, '🍇'];
 *
 * const fruits = ary.filter(nonNull);
 * // ['🍎', '🍊', '🍇'];
 * ```
 */
export function nonNull<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}
