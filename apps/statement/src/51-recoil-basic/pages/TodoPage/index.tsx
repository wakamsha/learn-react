import { css } from '@emotion/css';
import { gutter } from '@learn-react/core/src/helpers/Style';
import { RecoilRoot } from 'recoil';
import { AddForm } from './components/AddForm';
import { TodoList } from './components/TodoList';

export const TodoPage = () => (
  <RecoilRoot>
    <div className={styleBase}>
      <div className={styleFormColumn}>
        <h1>Todo List</h1>
        <AddForm />
      </div>
      <div className={styleListColumn}>
        <TodoList />
      </div>
    </div>
  </RecoilRoot>
);

const styleBase = css`
  display: grid;
  grid-template-areas: 'form list';
  grid-template-columns: 1.618fr 1fr;
  height: 100dvh;
`;

const styleFormColumn = css`
  display: flex;
  flex-direction: column;
  gap: ${gutter(6)};
  padding: 0 ${gutter(4)};
`;

const styleListColumn = css`
  grid-area: list;
`;
