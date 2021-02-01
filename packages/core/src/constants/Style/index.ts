export const Color = {
  // Theme
  ThemePrimaryNeutral: '#7E808C',
  ThemePrimaryLight: '#616474',
  ThemePrimaryLighter: '#E3E3E7',
  ThemePrimaryDark: '#656772',
  ThemePrimaryDarker: '#474A5E',

  ThemeDangerNeutral: '#D2397C',
  ThemeDangerLight: '#C71060',
  ThemeDangerDark: '#970847',
  ThemeDangerLighter: '#FCDEEC',

  ThemeDisabledNeutral: '#D6D9DF',
  ThemeDisabledLight: '#F6F6F8',
  ThemeDisabledDark: '#7E808C',

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
  TextureInput: '#F6F6F8',
  TextureBackdrop: '#E3E4E8',
} as const;

export type Color = ValueOf<typeof Color>;

export const FontFamily = {
  Default: '"Noto Sans Japanese", "メイリオ", Meiryo, sans-serif',
  Serif: '"Noto Serif Japanese", serif',
  Monospace: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace',
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

export const IconSize = {
  Tiny: '14px',
  Small: '16px',
  Regular: '20px',
  Large: '24px',
  Huge: '32px',
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

export const ZIndex = {
  Modal: 100,
  GlobalProgress: 1000,
  Notification: 1100,
  Popover: 1200,
  Tooltip: 1300,
} as const;

export const Shadow = {
  Neutral: `0 1px 4px 0 rgba(0, 0, 0, .2)`,
  Floating: `0 1px 8px 0 rgba(0, 0, 0, .2)`,
  Dialog: `0 10px 40px 0 rgba(0, 0, 0, .2)`,
  Deep: '0 6px 12px 0 rgba(0, 0, 0, .3)',
  Hover: `0 8px 12px 0 rgba(0, 0, 0, .3)`,
} as const;
