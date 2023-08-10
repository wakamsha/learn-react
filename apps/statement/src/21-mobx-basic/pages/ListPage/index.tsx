import { css } from '@emotion/css';
import { gutter } from '@learn-react/core/src/helpers/Style';
import { createContext, useState } from 'react';
import { AddForm } from './components/AddForm';
import { EditForm } from './components/EditForm';
import { ShowSection } from './components/ShowSection';
import { ListStore } from './stores/ListStore';

export const ListPage = () => {
  const [store] = useState(() => new ListStore());

  const Context = createContext(store);

  return (
    <Context.Provider value={store}>
      <div className={styleBase}>
        <Context.Consumer>
          {(store) => (
            <>
              <div className={styleColumn}>
                <AddForm listStore={store} />
                <EditForm listStore={store} />
              </div>
              <div className={styleColumn}>
                <ShowSection listStore={store} />
              </div>
            </>
          )}
        </Context.Consumer>
      </div>
    </Context.Provider>
  );
};

const styleBase = css`
  display: flex;
  padding: ${gutter(4)};

  > :not(:first-child) {
    margin-left: ${gutter(4)};
  }
`;

const styleColumn = css`
  flex: 1 1 100%;
`;
