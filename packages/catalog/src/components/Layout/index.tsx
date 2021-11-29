import { css } from '@emotion/css';
import type { ReactNode } from 'react';
import { Navigation } from '../Navigation';

type Props = {
  children: ReactNode;
};

export const Layout = ({ children }: Props) => (
  <div className={styleBase}>
    <div className={styleNavigationWrapper}>
      <Navigation />
    </div>
    <main>{children}</main>
  </div>
);

const styleBase = css`
  display: grid;
  grid-template-columns: auto 1fr;
  width: 100%;
  height: 100vh;
`;

const styleNavigationWrapper = css`
  width: 272px;
`;
