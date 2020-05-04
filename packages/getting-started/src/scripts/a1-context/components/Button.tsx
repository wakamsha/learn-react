import * as React from 'react';
import { Theme } from '../App';
import { css } from 'emotion';

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
        background: '#666',
      };
    case 'light':
      return {
        background: '#eee',
      };
  }
}

export const Button = ({ theme, label }: Props) => (
  <button className={baseStyle} style={getStyle(theme)}>
    {label}
  </button>
);
