import { css } from '@emotion/css';
import { PageTransition } from '@learn-react/core/components/utils/PageTransition';
import { withSuspense } from '@learn-react/core/helpers/Component';
import { gutter } from '@learn-react/core/helpers/Style';
import { lazy, type ReactNode } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Router } from './constants/Router';

/**
 * 02 に `<PageTransition>` を適用したもの。
 */
export const WithPageTransition = () => (
  <BrowserRouter>
    <Layout>
      <PageTransition>
        <Route path={Router.Home} element={<Home />} />
        <Route path={Router.Stones.Path} element={<Stones />} />
        <Route path="*" element={<NotFound />} />
      </PageTransition>
    </Layout>
  </BrowserRouter>
);

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <div className={styleBase}>
    <nav>
      <Navigation />
    </nav>
    <div className={styleContent}>{children}</div>
  </div>
);

const styleBase = css`
  display: grid;
  grid-template-columns: auto 1fr;
`;

const styleContent = css`
  padding: ${gutter(4)};
`;

const NotFound = () => <h1>404 Not Found</h1>;

const Home = withSuspense(lazy(() => import('./pages/Home').then(({ Home }) => ({ default: Home }))));
const Stones = withSuspense(lazy(() => import('./pages/Stones').then(({ Stones }) => ({ default: Stones }))));
