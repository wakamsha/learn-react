/* eslint-disable jsdoc/require-jsdoc */

export const Layout = {
  Horizontal: 'horizontal',
  Vertical: 'vertical',
  Zen: 'zen',
} as const;
export type Layout = ValueOf<typeof Layout>;

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
export type DeviceSize = ValueOf<typeof DeviceSize>;
