import { PageTransition } from '@learn-react/core/src/components/utils/PageTransition';
import { useState } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { Router } from '../../../@core/constants/Router';
import { ProfileEditPage } from './EditPage';
import { ProfileShowPage } from './ShowPage';
import { ProfileStore } from './stores/ProfileStore';

/**
 * React 標準の ContextAPI のみを使用するパターン
 */
// export const Profile = () => {
//   const profileStore = useRef(new ProfileStore());

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
  const [store] = useState(() => new ProfileStore());

  return (
    <>
      <h1>Profile</h1>
      <ProfileStore.Context.Provider value={store}>
        <PageTransition>
          <Route index element={<Navigate replace to={Router.paths.profileEdit} />} />
          <Route path={Router.paths.profileShow} element={<ProfileShowPage />} />
          <Route path={Router.paths.profileEdit} element={<ProfileEditPage />} />
        </PageTransition>
      </ProfileStore.Context.Provider>
    </>
  );
};
