import { css } from '@emotion/css';

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

export const NavigationStyle = {
  Base: css({
    padding: 16,
    height: '100vh',
    borderLeft: '1px solid gray',
    background: 'silver',
    flexShrink: 0,
  }),
  Title: css({
    margin: `0 0 16px`,
    paddingBottom: 16,
    borderBottom: `1px solid gray`,
    fontSize: 18,
  }),
  Navigation: css({
    listStyle: 'none',
    margin: 0,
    padding: 0,

    li: {
      marginBottom: 8,
    },
  }),
} as const;
