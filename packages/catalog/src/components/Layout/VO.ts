export const LayoutMode = {
  Neutral: 1,
  Zen: 2,
} as const;

export type LayoutMode = ValueOf<typeof LayoutMode>;
