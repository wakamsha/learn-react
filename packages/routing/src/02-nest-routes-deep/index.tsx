import { css } from '@emotion/css';
import { gutter } from '@learn-react/core/helpers/Style';
import type { ReactNode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Router } from './constants/Router';
import { Friends } from './pages/Friends';
import { Home } from './pages/Home';

/**
 * 01 に下記の変更を加えたもの。
 *
 * - `Routes` コンポーネントを入れ子にした構造に組み直す。
 * - `Outlet` の使用をやめる。
 *
 * @see https://reactrouter.com/docs/en/v6/faq#how-do-i-nest-routes-deep-in-the-tree
 */
export const NestRoutesDeep = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path={Router.Home} element={<Home />} />
        {/*
         * `/friends/serval` といった下層ページの URL に一致させるために
         * パスに `*` を含める。
         */}
        <Route path={Router.Friends.Path} element={<Friends />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
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
