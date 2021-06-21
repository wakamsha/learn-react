import { Theme, ThemeContext } from '../App';
import { Button } from './Button';

// Before
// ----------------
// export const ThemedButton = ({ theme }: { theme: 'dark' | 'light' }) => {
//   return <Button theme={theme} label="Hello world" />;
// };

// After
// ----------------
export const ThemedButton = () => (
  <ThemeContext.Consumer>{(theme: Theme) => <Button theme={theme} label="Hello Context API" />}</ThemeContext.Consumer>
);
