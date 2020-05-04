export const Duration = {
  Fade: '0.15s',
  Enter: '0.25s',
  Leave: '0.3s',
} as const;

export const Easing = {
  Enter: 'cubic-bezier(.11, .57, .14, 1)',
  Leave: 'cubic-bezier(0, .14, .75, 1)',
  Filter: 'cubic-bezier(0, 2.5, 0.2, 2.5)',
} as const;
