import { css } from '@emotion/css';
import { cssVar, gutter } from '@learn-react/core/src/helpers/Style';
import { BrowserRouter, generatePath, Navigate, Outlet, Route, Routes } from 'react-router';
import { Navigation } from './components/Navigation';
import { routes } from './routes';
import { About } from './routes/About';
import { Beatles } from './routes/Beatles';
import { Home as BeatlesHome } from './routes/Beatles/Home';
import { Member } from './routes/Beatles/Member';
import { Home } from './routes/Home';
import { Zeppelin } from './routes/Zeppelin';
import { Member as ZeppelinMember } from './routes/Zeppelin/Member';

export const Basic = () => (
  <BrowserRouter>
    <Routes>
      <Route path={routes.Home} element={<Layout />}>
        <Route index element={<Home />} />

        <Route path={routes.Beatles} element={<Beatles />}>
          <Route index element={<BeatlesHome />} />
          <Route path={routes.Beatle} element={<Member />} />
        </Route>

        <Route path={routes.Zeppelin} element={<Zeppelin />}>
          {/*
           * `/zeppelin` リンクから 入れ子ページに遷移（表示）したい場合は、
           * このように `Navigate` コンポーネントを element プロパティに渡す。
           * この機能は v5 の `Redirect` に相当する。
           */}
          <Route
            index
            element={<Navigate replace to={generatePath(routes.ZeppelinMember, { member: 'robert-plant' })} />}
          />
          <Route path={routes.ZeppelinMember} element={<ZeppelinMember />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="/about" element={<About />} />
    </Routes>
  </BrowserRouter>
);

const Layout = () => (
  <div className={styleBase}>
    <nav className={styleSidebar}>
      <Navigation />
    </nav>
    <main className={styleContent}>
      <Outlet />
    </main>
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
