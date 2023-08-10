import { css } from '@emotion/css';
import { gutter } from '@learn-react/core/src/helpers/Style';
import { RecoilRoot } from 'recoil';
import { GetByParamForm } from './components/GetByParamForm';
import { GetForm } from './components/GetForm';
import { Log } from './components/Log';
import { PostForm } from './components/PostForm';

export const UsersPage = () => {
  console.info('users page');

  return (
    <RecoilRoot>
      <div className={styleBase}>
        <div className={styleFormColumn}>
          <h1>Users Page</h1>
          <GetForm />
          <hr />
          <GetByParamForm />
          <hr />
          <PostForm />
        </div>

        <div className={styleLogColumn}>
          <Log />
        </div>
      </div>
    </RecoilRoot>
  );
};

const styleBase = css`
  display: grid;
  grid-template-areas: 'form log';
  grid-template-columns: 1.618fr 1fr;
  height: 100dvh;
`;

const styleFormColumn = css`
  display: flex;
  flex-direction: column;
  gap: ${gutter(6)};
  padding: 0 ${gutter(4)};
`;

const styleLogColumn = css`
  grid-area: log;
`;

// import { Suspense } from 'react';
// import { RecoilRoot, selector, useRecoilValue } from 'recoil';
// import { requestGetUsers } from '../../infra/client';

// const testState = selector({
//   key: 'test',
//   get: async () => {
//     const response = await requestGetUsers();

//     return response;
//   },
// });

// const TestChild = () => {
//   const test = useRecoilValue(testState);

//   return (
//     <dl>
//       <dt>Test child</dt>
//       <dd>
//         <pre>
//           <code>{JSON.stringify(test, null, 2)}</code>
//         </pre>
//       </dd>
//     </dl>
//   );
// };

// export const UsersPage = () => (
//   <RecoilRoot>
//     <Suspense fallback={<p>Now Loading...</p>}>
//       <TestChild />
//     </Suspense>
//   </RecoilRoot>
// );
