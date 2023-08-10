import { css } from '@emotion/css';
import { gutter } from '@learn-react/core/src/helpers/Style';
import { RecoilRoot } from 'recoil';
import { AddForm } from './AddForm';
import { EditForm } from './EditForm';
import { LogSection } from './LogSection';

export const ListPage = () => (
  <RecoilRoot>
    <div className={styleBase}>
      <div className={styleFormColumn}>
        <h1>Recoil</h1>
        <AddForm />
        <EditForm />
      </div>
      <div className={styleLogColumn}>
        <LogSection />
      </div>
    </div>
  </RecoilRoot>
);

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
