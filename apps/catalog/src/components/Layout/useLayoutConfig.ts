/* eslint-disable react/hook-use-state */
import { StorageProxy } from '@learn-react/core/src/helpers/Storage';
import { useEffect, useState } from 'react';
import { LayoutMode } from './VO';

const storageKey = 'GLOBAL_LAYOUT';

/**
 * Catalog 全体のレイアウト設定値を管理します。
 */
export function useLayoutConfig() {
  const [storage] = useState(() => new StorageProxy('localStorage'));

  const [layoutConfig, setLayoutConfig] = useState<LayoutMode>(() =>
    storage.getValue(storageKey) === '' || Number.isNaN(storage.getValue(storageKey))
      ? LayoutMode.Neutral
      : (Number(storage.getValue(storageKey)) as LayoutMode),
  );

  useEffect(() => {
    storage.setValue(storageKey, `${layoutConfig}`);
  }, [layoutConfig, storage]);

  return [layoutConfig, setLayoutConfig] as const;
}
