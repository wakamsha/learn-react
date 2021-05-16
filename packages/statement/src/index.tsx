import { css } from '@emotion/css';
import { StorageProxy } from '@learn-react/core/helpers/Storage';
import { applyGlobalStyle, gutter } from '@learn-react/core/helpers/Style';
import { ChangeEvent, StrictMode, useEffect, useRef, useState } from 'react';
import { render } from 'react-dom';
import { MobxHooksApp } from './22-mobx-hooks';
import { UnstatedBasicApp } from './31-unstated-basic';
import { createContainer } from './31-unstated-basic/helpers/Unstated';
import { ConstateBasicApp } from './41-constate-basic';

type Type = 'mobx' | 'unstated-next' | 'constate';

const storageKey = 'STATEMENT_TYPE';

function useStatementTypeConfig() {
  const storage = useRef(new StorageProxy('localStorage'));

  const [type, setType] = useState<Type>(
    storage.current.getValue(storageKey) === '' ? 'mobx' : (storage.current.getValue(storageKey) as Type),
  );

  useEffect(() => {
    storage.current.setValue(storageKey, type);
  }, [type]);

  return { type, updateType: setType };
}

const StatementTypeContainer = createContainer(useStatementTypeConfig);

const BootLoader = () => {
  const { type, updateType } = StatementTypeContainer.useContainer();

  const handleSwitch = (e: ChangeEvent<HTMLSelectElement>) => {
    updateType(e.target.value as Type);
  };

  return (
    <div className={styleBase}>
      {type === 'mobx' ? <MobxHooksApp /> : null}
      {type === 'unstated-next' ? <UnstatedBasicApp /> : null}
      {type === 'constate' ? <ConstateBasicApp /> : null}

      <select className={styleSwitch} onChange={handleSwitch} value={type}>
        <option value="mobx">mobx</option>
        <option value="unstated-next">unstated-next</option>
        <option value="constate">constate</option>
      </select>
    </div>
  );
};

const styleBase = css`
  position: relative;
`;

const styleSwitch = css`
  position: absolute;
  bottom: ${gutter(8)};
  left: ${gutter(4)};
  padding: ${gutter(1)} ${gutter(2)};
`;

applyGlobalStyle();

render(
  <StrictMode>
    <StatementTypeContainer.Provider>
      <BootLoader />
    </StatementTypeContainer.Provider>
  </StrictMode>,
  document.getElementById('app'),
);
