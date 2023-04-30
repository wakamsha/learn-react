import { createContainer } from '@learn-react/core/src/helpers/Container';
import { StorageProxy } from '@learn-react/core/src/helpers/Storage';
import { useEffect, useRef, useState } from 'react';
import { Layout } from './VO';

const storageKey = 'STORY_PAGE_LAYOUT';

function useHook() {
  const storage = useRef(new StorageProxy('localStorage'));

  const [layoutConfig, setLayoutConfig] = useState<Layout>(
    storage.current.getValue(storageKey) === '' ? Layout.Horizontal : (storage.current.getValue(storageKey) as Layout),
  );

  useEffect(() => {
    storage.current.setValue(storageKey, `${layoutConfig}`);
  }, [layoutConfig]);

  return { layoutConfig, setLayoutConfig };
}

export const LayoutConfigContainer = createContainer(useHook);
