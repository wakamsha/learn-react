import { createContainer } from '@learn-react/core/helpers/Container';
import { StorageProxy } from '@learn-react/core/helpers/Storage';
import { useEffect, useState } from 'react';
import { LayoutMode } from './VO';

const storageKey = 'GLOBAL_LAYOUT';

function useHook() {
  const [storage] = useState(() => new StorageProxy('localStorage'));

  const [layoutConfig, setLayoutConfig] = useState<LayoutMode>(() =>
    storage.getValue(storageKey) === '' || Number.isNaN(storage.getValue(storageKey))
      ? LayoutMode.Neutral
      : (Number(storage.getValue(storageKey)) as LayoutMode),
  );

  useEffect(() => {
    storage.setValue(storageKey, `${layoutConfig}`);
  }, [layoutConfig, storage]);

  return { layoutConfig, setLayoutConfig };
}

export const LayoutConfigContainer = createContainer(useHook);
