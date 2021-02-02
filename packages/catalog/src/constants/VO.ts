export const Layout = {
  Column: 1,
  Row: 2,
  Full: 3,
} as const;

export type Layout = ValueOf<typeof Layout>;
