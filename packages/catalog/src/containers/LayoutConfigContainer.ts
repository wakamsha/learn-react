import { createContainer } from '@learn-react/core/helpers/Unstated';
import { useEffect, useState } from 'react';
import { Layout } from '../constants/VO';

const STORAGE_KEY = 'LAYOUT';

const useLayoutConfig = () => {
  const [layoutConfig, setLayoutConfig] = useState<Layout>(
    Number.isNaN(window.localStorage[STORAGE_KEY])
      ? Layout.Column
      : (Number(window.localStorage[STORAGE_KEY]) as Layout),
  );

  useEffect(() => {
    window.localStorage[STORAGE_KEY] = layoutConfig;
  }, [layoutConfig]);

  return { layoutConfig, setLayoutConfig };
};

export const LayoutConfigContainer = createContainer(useLayoutConfig);
