export const Color = {
  // Theme
  ThemePrimary: '#e61376',
  ThemeSecondary: '#ccff00',
  ThemeInfo: '#55efcb',

  // Text
  TextNeutral: '#24243f',
  TextSub: '#808d96',

  // Line
  LineDefault: '#c8cbce',
  LineLight: '#d8dbdd',
  LineLighter: '#e3e5e6',
  LineDark: '#566B7F',

  // Texture
  TextureBody: '#F7F7F7',
  TextureCode: '#0f192a',
} as const;

export const FontSize = {
  Large: '20px',
  Medium: '16px',
  Regular: '14px',
  Small: '12px',
  Tiny: '11px',
  Nano: '10px',
} as const;

export const LineHeight = {
  Medium: 1.8,
  Regular: 1.6,
  Compressed: 1.4,
} as const;

export const BorderRadius = {
  Small: '2px',
  Regular: '5px',
  Medium: '8px',
  Circle: '999rem',
} as const;

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
