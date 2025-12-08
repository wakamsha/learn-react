import { createContainer } from '@learn-react/core/src/helpers/Container';
import { StorageProxy } from '@learn-react/core/src/helpers/Storage';
import { useEffect, useRef, useState } from 'react';
import { Layout } from './ValueObject';

const storageKey = 'STORY_PAGE_LAYOUT';

function useHook() {
  const storage = useRef(new StorageProxy('localStorage'));

  const [layoutConfig, setLayoutConfig] = useState<Layout>(
    // eslint-disable-next-line react-hooks/refs
    storage.current.getValue(storageKey) === '' ? Layout.Horizontal : (storage.current.getValue(storageKey) as Layout),
  );

  useEffect(() => {
    storage.current.setValue(storageKey, layoutConfig);
  }, [layoutConfig]);

  return { layoutConfig, setLayoutConfig };
}

/**
 * プレビュー領域とソースコードブロック領域のレイアウト情報を `React.Context` で管理します。
 */
export const LayoutConfigContainer = createContainer(useHook);
