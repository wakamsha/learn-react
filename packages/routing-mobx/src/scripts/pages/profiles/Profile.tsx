import * as React from 'react';
import { ProfileEditPage } from './EditPage';
import { ProfileShowPage } from './ShowPage';
import { ProfileStore } from '../../stores/ProfileStore';
import { Provider } from 'mobx-react';
import { Redirect, Route, Switch } from 'react-router';
import { Router } from '../../Router';
import { Stores } from '../../stores';

export class Profile extends React.Component {
  private store = new ProfileStore();

  public render() {
    return (
      <Provider store={this.store} key={Router.paths.profileShow}>
        <Switch location={Stores.historyStore.location}>
          <Route path={Router.paths.profileEdit} component={ProfileEditPage} />
          <Route path={Router.paths.profileShow} component={ProfileShowPage} />
          <Redirect to={Router.paths.profileShow} />
        </Switch>
      </Provider>
    );
  }
}
