import { css } from '@emotion/css';
import { PageTransition } from '@learn-react/core/src/components/utils/PageTransition';
import { gutter } from '@learn-react/core/src/helpers/Style';
import { Navigate, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { Router } from '../../../@core/constants/Router';
import { EditPage } from './EditPage';
import { ShowPage } from './ShowPage';

export const Profile = () => (
  <section className={styleRoot}>
    <h1>Profile</h1>
    <RecoilRoot>
      <PageTransition parentPath={`/${Router.paths.profile}`}>
        <Route index element={<Navigate replace to={Router.paths.profileShow} />} />
        <Route path={`/${Router.paths.profileShow}`} element={<ShowPage />} />
        <Route path={`/${Router.paths.profileEdit}`} element={<EditPage />} />
      </PageTransition>
    </RecoilRoot>
  </section>
);

const styleRoot = css`
  padding: ${gutter(4)};
`;
