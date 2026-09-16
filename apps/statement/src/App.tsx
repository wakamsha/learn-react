import { css } from '@emotion/css';
import { StorageProxy } from '@learn-react/core/src/helpers/Storage';
import { gutter } from '@learn-react/core/src/helpers/Style';
import { useEffect, useState, type ChangeEvent, type FC } from 'react';
import { MobxHooksApp } from './22-mobx-hooks';
import { UnstatedBasicApp } from './31-unstated-basic';
import { createContainer } from './31-unstated-basic/helpers/Unstated';
import { ConstateBasicApp } from './41-constate-basic';
import { JotaiBasicApp } from './51-jotai-basic';

export const App = () => {
  const { type, updateType } = TypeContainer.useContainer();

  const handleSwitch = (event: ChangeEvent<HTMLSelectElement>) => {
    updateType(event.target.value as Type);
  };

  const Component = Components[type];

  return (
    <div className={styleBase}>
      <Component />

      <select className={styleSwitch} value={type} onChange={handleSwitch}>
        {Object.keys(Components).map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
    </div>
  );
};

export const TypeContainer = createContainer(useTypeConfig);

const Components: Frozen<Type, FC> = {
  'mobx hooks': MobxHooksApp,
  'unstated-next': UnstatedBasicApp,
  constate: ConstateBasicApp,
  jotai: JotaiBasicApp,
};

type Type = 'mobx hooks' | 'unstated-next' | 'constate' | 'jotai';

const storageKey = 'STATEMENT_TYPE';

function useTypeConfig() {
  // oxlint-disable-next-line react/hook-use-state
  const [storage] = useState(() => new StorageProxy('localStorage'));

  const [type, setType] = useState<Type>(
    storage.getValue(storageKey) === '' ? 'mobx hooks' : (storage.getValue(storageKey) as Type),
  );

  useEffect(() => {
    storage.setValue(storageKey, type);
  }, [storage, type]);

  return { type, updateType: setType };
}

const styleBase = css`
  position: relative;
`;

const styleSwitch = css`
  position: absolute;
  bottom: ${gutter(8)};
  left: ${gutter(4)};
  padding: ${gutter(1)} ${gutter(2)};
`;
