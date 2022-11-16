import { StorageProxy } from '@learn-react/core/helpers/Storage';
import { gutter } from '@learn-react/core/helpers/Style';
import { css } from '@linaria/core';
import type { ChangeEvent, FC } from 'react';
import { useEffect, useState } from 'react';
import { MobxHooksApp } from './22-mobx-hooks';
import { UnstatedBasicApp } from './31-unstated-basic';
import { createContainer } from './31-unstated-basic/helpers/Unstated';
import { ConstateBasicApp } from './41-constate-basic';

export const App = () => {
  const { type, updateType } = TypeContainer.useContainer();

  const handleSwitch = (e: ChangeEvent<HTMLSelectElement>) => {
    updateType(e.target.value as Type);
  };

  const Component = Components[type];

  return (
    <div className={styleBase}>
      <Component />
      <select className={styleSwitch} onChange={handleSwitch} value={type}>
        <option value="mobx">mobx</option>
        <option value="unstated-next">unstated-next</option>
        <option value="constate">constate</option>
      </select>
    </div>
  );
};

export const TypeContainer = createContainer(useTypeConfig);

const Components: Frozen<Type, FC> = {
  mobx: MobxHooksApp,
  'unstated-next': UnstatedBasicApp,
  constate: ConstateBasicApp,
};

type Type = 'mobx' | 'unstated-next' | 'constate';

const storageKey = 'STATEMENT_TYPE';

function useTypeConfig() {
  const [storage] = useState(() => new StorageProxy('localStorage'));

  const [type, setType] = useState<Type>(
    storage.getValue(storageKey) === '' ? 'mobx' : (storage.getValue(storageKey) as Type),
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
