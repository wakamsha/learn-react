import { PageTransition } from '../../components/PageTransition';
import { ProfileEditPage } from './EditPage';
import { ProfileShowPage } from './ShowPage';
import { ProfileStore } from '../../stores/ProfileStore';
import { Redirect, Route } from 'react-router';
import { Router } from '../../../@core/constants/Router';
import React, { useMemo } from 'react';

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
//             path={Router.paths.profileShow}
//             render={() => <Context.Consumer>{store => <ProfileShowPage store={store} />}</Context.Consumer>}
//           />
//           <Route
//             path={Router.paths.profileEdit}
//             render={() => <Context.Consumer>{store => <ProfileEditPage store={store} />}</Context.Consumer>}
//           />
//           <Redirect to={Router.paths.profileEdit} />
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
          <Route path={Router.paths.profileShow} component={ProfileShowPage} />
          <Route path={Router.paths.profileEdit} component={ProfileEditPage} />
          <Redirect to={Router.paths.profileEdit} />
        </PageTransition>
      </ProfileStore.Context.Provider>
    </>
  );
};
