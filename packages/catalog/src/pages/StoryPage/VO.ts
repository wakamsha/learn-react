export const Layout = {
  Horizontal: 'horizontal',
  Vertical: 'vertical',
  Zen: 'zen',
} as const;

export type Layout = ValueOf<typeof Layout>;
