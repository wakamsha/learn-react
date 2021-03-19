import { createContainer } from '@learn-react/core/helpers/Container';
import { StorageProxy } from '@learn-react/core/helpers/Storage';
import { useEffect, useRef, useState } from 'react';
import { Layout } from './VO';

const storageKey = 'LAYOUT';

const useLayoutConfig = () => {
  const storage = useRef(new StorageProxy('localStorage'));

  const [layoutConfig, setLayoutConfig] = useState<Layout>(
    storage.current.getValue(storageKey) === '' || Number.isNaN(storage.current.getValue(storageKey))
      ? Layout.Column
      : (Number(storage.current.getValue(storageKey)) as Layout),
  );

  useEffect(() => {
    storage.current.setValue(storageKey, `${layoutConfig}`);
  }, [layoutConfig]);

  return { layoutConfig, setLayoutConfig };
};

export const LayoutConfigContainer = createContainer(useLayoutConfig);
