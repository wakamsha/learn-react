import { PageTransition } from '@learn-react/core/components/utils/PageTransition';
import { createContext, useMemo, useRef } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { Router } from '../../../@core/constants/Router';
import { ProfileStore } from '../../stores/ProfileStore';
import { ProfileEditPage } from './EditPage';
import { ProfileShowPage } from './ShowPage';

/**
 * クラスコンポーネントと Provider を使ったレガシーなパターン
 */
// export class Profile extends Component {
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
// export class Profile extends Component {
//   private readonly store = new ProfileStore();
//   private readonly Context = createContext(this.store);

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
  const store = useRef(new ProfileStore());

  const Context = useMemo(() => createContext(store), [store]);

  return (
    <>
      <h1>Profile</h1>
      <Context.Provider value={store}>
        <PageTransition>
          <Route index element={<Navigate replace to={Router.paths.profileEdit} />} />
          <Route
            path={Router.paths.profileShow}
            element={<Context.Consumer>{store => <ProfileShowPage store={store.current} />}</Context.Consumer>}
          />
          <Route
            path={Router.paths.profileEdit}
            element={<Context.Consumer>{store => <ProfileEditPage store={store.current} />}</Context.Consumer>}
          />
        </PageTransition>
      </Context.Provider>
    </>
  );
};
