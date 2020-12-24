import { PageTransition } from '@learn-react/core/components/PageTransition';
import { useMemo } from 'react';
import { Redirect, Route } from 'react-router';
import { Router } from '../../../@core/constants/Router';
import { ProfileStore } from '../../stores/ProfileStore';
import { ProfileEditPage } from './EditPage';
import { ProfileShowPage } from './ShowPage';

/**
 * React 標準の ContextAPI のみを使用するパターン
 */
// export const Profile = () => {
//   const profileStore = useMemo(() => new ProfileStore(), []);

//   const Context = useMemo(() => createContext(profileStore), [profileStore]);

//   return (
//     <>
//       <h1>Profile</h1>
//       <Context.Provider value={profileStore}>
//         <PageTransition>
//           <Route
//             path={Router.Paths.ProfileShow}
//             render={() => <Context.Consumer>{store => <ProfileShowPage store={store} />}</Context.Consumer>}
//           />
//           <Route
//             path={Router.Paths.ProfileEdit}
//             render={() => <Context.Consumer>{store => <ProfileEditPage store={store} />}</Context.Consumer>}
//           />
//           <Redirect to={Router.Paths.ProfileEdit} />
//         </PageTransition>
//       </Context.Provider>
//     </>
//   );
// };

/**
 * グローバルストアと同様に Static な Context を使用するパターン
 */
export const Profile = () => {
  const profileStore = useMemo(() => new ProfileStore(), []);

  return (
    <>
      <h1>Profile</h1>
      <ProfileStore.Context.Provider value={profileStore}>
        <PageTransition>
          <Route path={Router.Paths.ProfileShow} component={ProfileShowPage} />
          <Route path={Router.Paths.ProfileEdit} component={ProfileEditPage} />
          <Redirect to={Router.Paths.ProfileEdit} />
        </PageTransition>
      </ProfileStore.Context.Provider>
    </>
  );
};
