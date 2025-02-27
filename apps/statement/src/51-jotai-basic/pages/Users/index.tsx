import { css } from '@emotion/css';
import { gutter } from '@learn-react/core/src/helpers/Style';
import { GetByParamForm } from './components/GetByParamForm';
import { GetForm } from './components/GetForm';
import { Log } from './components/Log';
import { PostForm } from './components/PostForm';

export const UsersPage = () => {
  console.info('users page');

  return (
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
  );
};

const styleBase = css`
  display: flex;
  height: 100dvh;
`;

const styleFormColumn = css`
  flex: 1 1 100%;
  padding: 0 ${gutter(4)};

  > :not(:first-child) {
    margin-top: ${gutter(6)};
  }
`;

const styleLogColumn = css`
  flex: 1.618 1 100%;
`;
