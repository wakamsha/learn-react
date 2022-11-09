import { useMemo } from 'react';
import { Loadable } from './Loadable';

type PrimitiveTypes = string | number | bigint | boolean | undefined;

type Key<P> = PrimitiveTypes | [PrimitiveTypes, ...P[]];

/**
 * 必ず React.Suspense と組み合わせて使用します。
 *
 * @todo キャッシュする・しないを選択できるようにする ( `revalidateIfStale` ) 。
 */
export function useData<T, P>(key: Key<P>, fetcher: (...p: P[]) => Promise<T>, revalidateIfStale = true): T {
  const [dataMapKey, ...params] = useMemo(() => {
    if (Array.isArray(key)) {
      const [, ...params] = key;
      return [JSON.stringify(key), ...params];
    }

    return [key];
  }, [key]);

  const cachedData = dataMap.get(dataMapKey) as Loadable<T> | undefined;

  if (cachedData === undefined || !revalidateIfStale) {
    const [loadable, promise] = Loadable.newAndGoPromise(fetcher(...params));
    dataMap.set(dataMapKey, loadable);
    throw promise;
  }

  return cachedData.getOrThrow();
}

const dataMap: Map<PrimitiveTypes, unknown> = new Map();
