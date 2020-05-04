// https://ja.reactjs.org/docs/context.html
import { Toolbar } from './components/Toolbar';
import React, { createContext, useCallback, useState } from 'react';

export type Theme = 'dark' | 'light';

// Before
// ----------------

// export const ContextApp = () => {
//   return <Toolbar theme="dark" />;
// };

// After
// ----------------

export const ThemeContext = createContext<Theme>('light');

export const ContextApp = () => {
  const [theme, setTheme] = useState<Theme>('dark');

  const handleClick = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  }, [theme]);

  return (
    <>
      <ThemeContext.Provider value={theme}>
        <Toolbar />
      </ThemeContext.Provider>
      <button onClick={handleClick}>Toggle Theme</button>
    </>
  );
};
