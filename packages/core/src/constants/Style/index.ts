export const Color2 = {
  // Theme
  ThemePrimaryNeutral: {
    light: '#7E808C',
    dark: '',
  },
  ThemePrimaryLight: {
    light: '#E3E3E7',
    dark: '#BFC0C4',
  },
  ThemePrimaryDark: {
    light: '#656772',
    dark: '',
  },
  /** @deprecated */
  ThemePrimaryDarker: {
    light: '#474A5E',
    dark: '',
  },
  ThemeDangerNeutral: {
    light: '#D2397C',
    dark: '#D2397C',
  },
  ThemeDangerLight: {
    light: '#FCDEEC',
    dark: '#FCDEEC',
  },
  ThemeDangerDark: {
    light: '#970847',
    dark: '#970847',
  },
  ThemeDisabledNeutral: {
    light: '#D6D9DF',
    dark: '#6D6D6D',
  },
  ThemeDisabledLight: {
    light: '#F6F6F8',
    dark: '#525252',
  },
  ThemeDisabledDark: {
    light: '#7E808C',
    dark: '#717171',
  },

  // Text
  TextNeutral: {
    light: '#24243F',
    dark: '#D5D4D5',
  },
  TextSub: {
    light: '#808D96',
    dark: '#9F9FA0',
  },

  // Line
  LineLight: {
    light: '#E3E3E7',
    dark: '',
  },
  LineNeutral: {
    light: '#BFC1C9',
    dark: '#2F2F2F',
  },
  LineDark: {
    light: '#7E808C',
    dark: '#535353',
  },

  // Texture
  TextureBody: {
    light: '#F7F7F7',
    dark: '#1E1E1E',
  },
  TextureCode: {
    light: '#F9F9F9',
    dark: '#1E2127',
  },
  TextureInput: {
    light: '#F6F6F8',
    dark: '#353535',
  },
  TextureBackdrop: {
    light: '#E3E4E8',
    dark: '#12121B',
  },
  TexturePale: {
    light: '#FBFBFC',
    dark: '#414141',
  },
  TexturePaper: {
    light: '#FFFFFF',
    dark: '#414141',
  },
} as const;

export const Color = {
  // Theme
  ThemePrimaryNeutral: '#7E808C',
  /** @deprecated */
  ThemePrimaryLight: '#616474',
  ThemePrimaryLighter: '#E3E3E7',
  ThemePrimaryDark: '#656772',
  ThemePrimaryDarker: '#474A5E',

  ThemeDangerNeutral: '#D2397C',
  /** @deprecated */
  ThemeDangerLight: '#C71060',
  ThemeDangerLighter: '#FCDEEC',
  ThemeDangerDark: '#970847',

  ThemeDisabledNeutral: '#D6D9DF',
  ThemeDisabledLight: '#F6F6F8',
  ThemeDisabledDark: '#7E808C',

  // Text
  TextNeutral: '#24243f',
  TextSub: '#808d96',

  // Line
  LineNeutral: '#BFC1C9',
  LineLight: '#E3E3E7',
  LineDark: '#7E808C',

  // Texture
  TextureBody: '#F7F7F7',
  TextureCode: '#0F192A',
  TextureInput: '#F6F6F8',
  TextureBackdrop: '#E3E4E8',
  TexturePale: '#FBFBFC',
  TexturePaper: '#FFFFFF',
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
