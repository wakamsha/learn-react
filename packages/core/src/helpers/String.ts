/**
 * アプリケーション横断でユニークな文字列を生成します。
 */
export const makeId = (() => {
  let id = 0;
  return () => `id-${++id}`;
})();
