import * as React from 'react';
import { PageTransition } from '../../components/PageTransition';
import { ProfileEditPage } from './EditPage';
import { ProfileShowPage } from './ShowPage';
import { ProfileStore } from '../../stores/ProfileStore';
import { Redirect, Route } from 'react-router';
import { Router } from '../../Router';
import { Stores } from '../../stores';

/**
 * クラスコンポーネントと Provider を使ったレガシーなパターン
 */
// export class Profile extends React.Component {
//   private readonly store = new ProfileStore();

//   public render () {
//     return (
//       <>
//         <h1>Profile</h1>
//         <Provider store={this.store} key={Router.paths.profileShow}>
//           <Switch location={Stores.historyStore.location}>
//             <Route path={Router.paths.profileEdit} component={ProfileEditPage} />
//             <Route path={Router.paths.profileShow} component={ProfileShowPage} />
//             <Redirect to={Router.paths.profileShow} />
//           </Switch>
//         </Provider>
//       </>
//     )
//   }
// }

/**
 * クラスコンポーネントと ContextAPI を使ったパターン
 */
// export class Profile extends React.Component {
//   private readonly store = new ProfileStore();
//   private readonly Context = React.createContext(this.store);

//   public render() {
//     return (
//       <>
//         <h1>Profile</h1>
//         <this.Context.Provider value={this.store}>
//           <Switch location={Stores.historyStore.location}>
//             <Route
//               path={Router.paths.profileShow}
//               render={() => <this.Context.Consumer>{store => <ProfileShowPage store={store} />}</this.Context.Consumer>}
//             />
//             <Route
//               path={Router.paths.profileEdit}
//               render={() => <this.Context.Consumer>{store => <ProfileEditPage store={store} />}</this.Context.Consumer>}
//             />
//           </Switch>
//         </this.Context.Provider>
//       </>
//     );
//   }
// }

/**
 * FC と ContextAPI を使ったモダンなパターン
 */
export const Profile = () => {
  const store = React.useRef(new ProfileStore()).current;
  const Context = React.useMemo(() => React.createContext(store), [store]);

  return (
    <>
      <h1>Profile</h1>
      <Context.Provider value={store}>
        <PageTransition historyStore={Stores.historyStore}>
          <Route
            path={Router.paths.profileShow}
            render={() => <Context.Consumer>{store => <ProfileShowPage store={store} />}</Context.Consumer>}
          />
          <Route
            path={Router.paths.profileEdit}
            render={() => <Context.Consumer>{store => <ProfileEditPage store={store} />}</Context.Consumer>}
          />
          <Redirect to={Router.paths.profileShow} />
        </PageTransition>
      </Context.Provider>
    </>
  );
};
