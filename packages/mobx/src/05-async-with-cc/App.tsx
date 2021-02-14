// import { css } from '@emotion/css';
// import { createContext } from 'react';
// import { GetForm } from './components/GetForm';
// import { GetWithParamForm } from './components/GetWithParamForm';
// import { Log } from './components/Log';
// import { PostForm } from './components/PostForm';
// import { Stores } from './stores';

// const JSONPlaceholderContext = createContext(Stores.jsonPlaceholderStore);

// export const AsyncWithCC = () => (
//   <JSONPlaceholderContext.Provider value={Stores.jsonPlaceholderStore}>
//     <div className={baseStyle}>
//       <div className={formColumnStyle}>
//         <h1>Async w/ CC</h1>
//         <JSONPlaceholderContext.Consumer>{store => <GetForm store={store} />}</JSONPlaceholderContext.Consumer>
//         <hr />
//         <JSONPlaceholderContext.Consumer>{store => <GetWithParamForm store={store} />}</JSONPlaceholderContext.Consumer>
//         <hr />
//         <JSONPlaceholderContext.Consumer>{store => <PostForm store={store} />}</JSONPlaceholderContext.Consumer>
//       </div>
//       <div className={logColumnStyle}>
//         <JSONPlaceholderContext.Consumer>{store => <Log store={store} />}</JSONPlaceholderContext.Consumer>
//       </div>
//     </div>
//   </JSONPlaceholderContext.Provider>
// );

// const baseStyle = css({
//   display: 'flex',
//   height: '100vh',
// });

// const formColumnStyle = css({
//   padding: '0 16px',
//   flex: '1 1 100%',
// });

// const logColumnStyle = css({
//   flex: '1.618 1 100%',
// });
