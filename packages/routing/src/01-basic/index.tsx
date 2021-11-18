import { css } from '@emotion/css';
import { gutter } from '@learn-react/core/helpers/Style';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Expenses } from './pages/Expenses';
import { Friends } from './pages/Friends';
import { Friend } from './pages/Friends/Friend';
import { Home } from './pages/Home';
import { Invoice } from './pages/Invoice';
import { Invoices } from './pages/Invoices';

/**
 * @see https://reactrouter.com/docs/en/v6/getting-started/tutorial
 */
export const Basic = () => (
  <BrowserRouter>
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="invoices" element={<Invoices />}>
            <Route
              index
              element={
                <main style={{ padding: '1rem' }}>
                  <p>Select an invoice</p>
                </main>
              }
            />
            <Route path=":id" element={<Invoice />} />
          </Route>
          <Route path="friends" element={<Friends />}>
            <Route path=":id" element={<Friend />} />
            {/*
             * `/friends` リンクから 入れ子ページに遷移（表示）したい場合は、
             * このように `Navigate` コンポーネントを element プロパティに渡せば OK。
             * v5 でいう `Redirect` に相当。
             */}
            <Route path="/friends" element={<Navigate replace to="/friends/serval" />} />
          </Route>
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
