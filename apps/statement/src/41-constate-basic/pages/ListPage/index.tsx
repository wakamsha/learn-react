import { css } from '@emotion/css';
import { gutter } from '@learn-react/core/src/helpers/Style';
import { AddForm } from './components/AddForm';
import { EditForm } from './components/EditForm';
import { ShowSection } from './components/ShowSection';
import { ListProvider } from './containers/ListContainer';

export const ListPage = () => {
  console.info('list page');

  return (
    <ListProvider>
      <div className={styleBase}>
        <div className={styleFormColumn}>
          <h1>Constate</h1>
          <AddForm />
          <EditForm />
        </div>
        <div className={styleLogColumn}>
          <ShowSection />
        </div>
      </div>
    </ListProvider>
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
