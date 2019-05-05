import * as React from 'react';

export type Theme = {
  foreground: string;
  background: string;
};

export const themes: {
  [name: string]: Theme;
} = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
};

export const ThemeContext = React.createContext({
  theme: themes.dark,
  toggleTheme: () => {},
});
