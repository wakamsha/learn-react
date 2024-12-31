import { css } from '@emotion/css';
import { cssVar, gutter } from '@learn-react/core/src/helpers/Style';
import { type ReactNode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Navigation } from './components/Navigation';
import { routes } from './routes';
import { About } from './routes/About';
import { Beatles } from './routes/Beatles';
import { Home } from './routes/Home';
import { Zeppelin } from './routes/Zeppelin';

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
        <Route path={routes.Home.Path} element={<Home />} />

        <Route path={routes.About.Path} element={<About />} />

        <Route path={routes.Beatles.Path} element={<Beatles />} />

        <Route path={routes.Zeppelin.Path} element={<Zeppelin />} />

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
    <nav className={styleSidebar}>
      <Navigation />
    </nav>
    <main className={styleContent}>{children}</main>
  </div>
);

const styleBase = css`
  display: grid;
  grid-template-areas: 'sidebar content';
  grid-template-columns: 240px 1fr;
  width: 100%;
  height: 100dvh;
`;

const styleSidebar = css`
  grid-area: sidebar;
  overflow: hidden;
  border-right: 1px solid ${cssVar('LineLight')};
`;

const styleContent = css`
  grid-area: content;
  padding: ${gutter(4)};
`;

const NotFound = () => <h1>404 Not Found</h1>;
