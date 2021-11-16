import { css } from '@emotion/css';
import { gutter } from '@learn-react/core/helpers/Style';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Friends } from './pages/Friends';
import { Home } from './pages/Home';

/**
 * 01 から `Routes` コンポーネントを入れ子にした構造に組み直したもの。
 *
 * @see https://reactrouter.com/docs/en/v6/faq#how-do-i-nest-routes-deep-in-the-tree
 */
export const NestRoutesDeep = () => (
  <BrowserRouter>
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/*
           * `/friends/serval` といった下層ページの URL に一致させるために
           * パスに `*` を含める。
           */}
          <Route path="friends/*" element={<Friends />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  </BrowserRouter>
);

const Layout = () => (
  <div className={styleBase}>
    <nav>
      <Navigation />
    </nav>
    <div className={styleContent}>
      <Outlet />
    </div>
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
