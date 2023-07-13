/**
 * web ブラウザの scrollbar のサイズ ( px ) を取得します。
 */
export function scrollbarSize(): number {
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  document.body.appendChild(outer);

  const widthNoScroll = outer.offsetWidth;

  // force scrollbars
  outer.style.overflow = 'scroll';

  // add inner div
  const inner = document.createElement('div');
  inner.style.width = '100%';
  outer.appendChild(inner);

  const widthWithScroll = inner.offsetWidth;

  // remove div
  outer.parentNode?.removeChild(outer);

  return widthNoScroll - widthWithScroll;
}

/**
 * HTML 要素のスクロールバー ( 縦 ) が表示されているかどうかを検証します。
 *
 * @param element - 検証する HTML 要素。未指定の場合は `document.documentElement` ( `<html />` ) を検証します。
 *
 * @returns 表示されているかどうか
 */
export function isVisibleScrollbarOf(element: HTMLElement = document.documentElement): boolean {
  return element.scrollHeight > element.clientHeight;
}
