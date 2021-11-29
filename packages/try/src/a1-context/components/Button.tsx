import { css } from '@emotion/css';
import type { Theme } from '../App';

const baseStyle = css({
  padding: `8px 48px`,
  fontSize: 14,
});

type Props = {
  theme: Theme;
  label: string;
};

// eslint-disable-next-line consistent-return
function getStyle(theme: Theme) {
  switch (theme) {
    case 'dark':
      return {
        color: 'white',
        backgroundColor: '#666',
      };
    case 'light':
      return {
        backgroundColor: '#eee',
      };
  }
}

export const Button = ({ theme, label }: Props) => (
  <button className={baseStyle} style={getStyle(theme)}>
    {label}
  </button>
);
