// oxlint-disable catch-or-return
import { css } from '@emotion/css';
import { PageTransition } from '@learn-react/core/src/components/utils/PageTransition';
import { withSuspense } from '@learn-react/core/src/helpers/Component';
import { cssVar, gutter } from '@learn-react/core/src/helpers/Style';
import { lazy, type ReactNode } from 'react';
import { BrowserRouter, Route } from 'react-router';
import { Navigation } from './components/Navigation';
import { routes } from './routes';

/**
 * 02 に `<PageTransition>` を適用したもの。
 */
export const WithPageTransition = () => (
  <BrowserRouter>
    <Layout>
      <PageTransition>
        <Route path={routes.Home.Path} element={<Home />} />

        <Route path={routes.About.Path} element={<About />} />

        <Route path={routes.Beatles.Path} element={<Beatles />} />

        <Route path={routes.Zeppelin.Path} element={<Zeppelin />} />

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

const Home = withSuspense(lazy(() => import('./routes/Home').then(({ Home }) => ({ default: Home }))));
const About = withSuspense(lazy(() => import('./routes/About').then(({ About }) => ({ default: About }))));
const Beatles = withSuspense(lazy(() => import('./routes/Beatles').then(({ Beatles }) => ({ default: Beatles }))));
const Zeppelin = withSuspense(lazy(() => import('./routes/Zeppelin').then(({ Zeppelin }) => ({ default: Zeppelin }))));
