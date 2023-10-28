import { useMemo } from 'react';
import { Loadable } from './Loadable';

type PrimitiveTypes = string | number | bigint | boolean | undefined;

type Key<P> = PrimitiveTypes | [PrimitiveTypes, ...P[]];

/**
 * 必ず React.Suspense と組み合わせて使用します。
 *
 * @param key               - このリクエストのためのユニークなキー文字列（または数値、bool値、undefined）。
 *
 * @param fetcher           - データをフェッチするための Promise を返す関数
 *
 * @param revalidateIfStale - `古いデータがある場合でも、自動再検証をするかどうか。
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

const dataMap = new Map<PrimitiveTypes, unknown>();
