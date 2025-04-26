export const Tool = ['pen', 'eraser'] as const;

export type Tool = (typeof Tool)[number];
