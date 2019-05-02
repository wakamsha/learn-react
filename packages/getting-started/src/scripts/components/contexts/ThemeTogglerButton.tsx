import * as React from 'react';
import { ThemeContext } from './ThemeContext';

export function ThemeTogglerButton() {
  return (
    <ThemeContext.Consumer>
      {({ theme, toggleTheme }) => (
        <button onClick={toggleTheme} style={{ background: theme.background, color: theme.foreground }}>
          Toggle Theme
        </button>
      )}
    </ThemeContext.Consumer>
  );
}
