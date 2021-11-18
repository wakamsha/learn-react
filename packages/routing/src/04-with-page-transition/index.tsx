import { css } from '@emotion/css';
import { PageTransition } from '@learn-react/core/components/utils/PageTransition';
import { gutter } from '@learn-react/core/helpers/Style';
import { ReactNode } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { Stones } from './pages/Stones';

/**
 * 02 に `<PageTransition>` を適用したもの。
 */
export const WithPageTransition = () => (
  <BrowserRouter>
    <Layout>
      <PageTransition>
        <Route path="/" element={<Home />} />
        <Route path="stones/*" element={<Stones />} />
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
