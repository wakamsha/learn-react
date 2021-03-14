export type Vertical = 'top' | 'bottom';

export type Horizontal = 'left' | 'center' | 'right';

/**
 * Tab キーでフォーカス可能な DOM セレクタ一覧
 */
export const FOCUSABLE_ELEMENTS = [
  'a[href]',
  'area[href]',
  'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
  'select:not([disabled]):not([aria-hidden])',
  'textarea:not([disabled]):not([aria-hidden])',
  'button:not([disabled]):not([aria-hidden])',
  'iframe',
  'object',
  'embed',
  '[contenteditable]',
  '[tabindex]:not([tabindex^="-"])',
] as const;
