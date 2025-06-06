import { css } from '@emotion/css';
import { cssVar, gutter } from '@learn-react/core/src/helpers/Style';
import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider } from 'react-router';
import { Navigation } from './components/Navigation';
import { routes } from './routes';
import { About } from './routes/About';
import { Beatles, clientLoader as beatlesLoader } from './routes/Beatles';
import { Home as BeatlesHome } from './routes/Beatles/Home';
import { Member as BeatlesMember, clientLoader as beatlesMemberLoader } from './routes/Beatles/Member';
import { Home } from './routes/Home';
import { Zeppelin, clientLoader as zeppelinLoader } from './routes/Zeppelin';
import { Home as ZeppelinHome } from './routes/Zeppelin/Home';
import { Member as ZeppelinMember, clientLoader as zeppelinMemberLoader } from './routes/Zeppelin/Member';

export const Basic = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path={routes.Home} element={<Layout />}>
          <Route index element={<Home />} />

          <Route path={routes.Beatles} element={<Beatles />} loader={beatlesLoader}>
            <Route index element={<BeatlesHome />} />
            <Route path={routes.Beatle} element={<BeatlesMember />} loader={beatlesMemberLoader} />
          </Route>

          <Route path={routes.Zeppelin} element={<Zeppelin />} loader={zeppelinLoader}>
            <Route index element={<ZeppelinHome />} />
            <Route path={routes.ZeppelinMember} element={<ZeppelinMember />} loader={zeppelinMemberLoader} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/about" element={<About />} />
      </>,
    ),
  );

  return <RouterProvider router={router} />;
};

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
