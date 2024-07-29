/** プレビュー領域とソースコード領域のレイアウト。 */
export const Layout = {
  /** 双方を縦方向に並べて表示する。 */
  Horizontal: 'horizontal',
  /** 双方を横方向に並べて表示する。 */
  Vertical: 'vertical',
  /** ソースコードを非表示にし、プレビューを領域いっぱいに表示する。 */
  Zen: 'zen',
} as const;

/** プレビュー領域とソースコード領域のレイアウト。 */
export type Layout = ValueOf<typeof Layout>;

/** プレビュー領域の表示サイズ。 */
export const DeviceSize = {
  unset: {
    width: undefined,
    height: undefined,
  },
  'iPhone 6/7/8': {
    width: 375,
    height: 667,
  },
  'iPhone 6/7/8/ Plus': {
    width: 414,
    height: 736,
  },
  'iPhone X': {
    width: 375,
    height: 812,
  },
  'iPhone XR': {
    width: 414,
    height: 896,
  },
  'iPhone 12 Pro': {
    width: 390,
    height: 844,
  },
  'iPad mini': {
    width: 768,
    height: 1024,
  },
  'iPad Air': {
    width: 820,
    height: 1180,
  },
  'iPad Pro': {
    width: 1024,
    height: 1366,
  },
} as const;

/** プレビュー領域の表示サイズ。 */
export type DeviceSize = ValueOf<typeof DeviceSize>;
