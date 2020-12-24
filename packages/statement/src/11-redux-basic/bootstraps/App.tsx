import { Navigation } from '@learn-react/core/components/Navigation';
import { gutter } from '@learn-react/core/helpers/Style';
import { css } from 'emotion';
import { ComponentProps } from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { Router } from '../constants/Router';
import { HomePage } from '../pages/Home';
import { ListPage } from '../pages/ListPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { ProfileEditPage } from '../pages/profiles/EditPage';
import { ProfileShowPage } from '../pages/profiles/ShowPage';
import { store } from '../stores/store';

export const App = () => (
  <Provider store={store}>
    <div className={baseStyle}>
      <Navigation title="Redux Basic" items={linkItems} />
      <div className={contentStyle}>
        <Switch>
          <Route path={Router.paths.home} component={HomePage} exact />
          <Route path={Router.paths.profileShow} component={ProfileShowPage} />
          <Route path={Router.paths.profileEdit} component={ProfileEditPage} />
          <Route path={Router.paths.list} component={ListPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </div>
  </Provider>
);

const linkItems: ComponentProps<typeof Navigation>['items'] = [
  {
    label: 'Home',
    to: Router.paths.home,
  },
  {
    label: 'Profile',
    items: [
      {
        label: 'Edit',
        to: Router.paths.profileEdit,
      },
      {
        label: 'Show',
        to: Router.paths.profileShow,
      },
    ],
  },
  {
    label: 'List',
    to: Router.paths.list,
  },
];

const baseStyle = css`
  display: flex;
  width: 100%;
`;

const contentStyle = css`
  flex-grow: 1;
  height: 100vh;
  padding: ${gutter(4)};
`;
