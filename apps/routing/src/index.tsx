/* eslint-disable react/hook-use-state */
import { css } from '@emotion/css';
import { LineHeight } from '@learn-react/core/src/constants/Style';
import { createContainer } from '@learn-react/core/src/helpers/Container';
import { StorageProxy } from '@learn-react/core/src/helpers/Storage';
import { applyGlobalStyle, applyResetStyle, gutter } from '@learn-react/core/src/helpers/Style';
import { StrictMode, useEffect, useState, type ChangeEvent, type FC } from 'react';
import { createRoot } from 'react-dom/client';
import { Basic } from './01-basic';
import { NestRoutesDeep } from './02-nest-routes-deep';
import { RouteObjects } from './03-route-objects';
import { WithPageTransition } from './04-with-page-transition';

type Type = '1. basic' | '2. nest-routes-deep' | '3. route-objects' | '4. with-page-transition';

const storageKey = 'ROUTING_TYPE';

function useTypeConfig() {
  const [storage] = useState(() => new StorageProxy('localStorage'));

  const [type, setType] = useState<Type>(
    storage.getValue(storageKey) === '' ? '1. basic' : (storage.getValue(storageKey) as Type),
  );

  useEffect(() => {
    storage.setValue(storageKey, type);
  }, [storage, type]);

  return { type, updateType: setType };
}

const TypeContainer = createContainer(useTypeConfig);

const Components: Record<Type, FC> = {
  '1. basic': Basic,
  '2. nest-routes-deep': NestRoutesDeep,
  '3. route-objects': RouteObjects,
  '4. with-page-transition': WithPageTransition,
};

const BootLoader = () => {
  const { type, updateType } = TypeContainer.useContainer();

  const handleSwitch = (event: ChangeEvent<HTMLSelectElement>) => {
    window.location.replace('/');
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

const styleBase = css`
  position: relative;
`;

const styleSwitch = css`
  position: fixed;
  right: ${gutter(4)};
  bottom: ${gutter(8)};
  padding: ${gutter(1)} ${gutter(2)};
  line-height: ${LineHeight.Regular};
`;

applyResetStyle();

applyGlobalStyle();

const root = createRoot(document.querySelector('#app') as HTMLElement);

root.render(
  <StrictMode>
    <TypeContainer.Provider>
      <BootLoader />
    </TypeContainer.Provider>
  </StrictMode>,
);
