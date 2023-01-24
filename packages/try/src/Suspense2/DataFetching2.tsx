import { Suspense } from 'react';
import { fetchData } from './fetchData';

/**
 * @see https://zenn.dev/uhyo/books/react-concurrent-handson/viewer/data-fetching-2
 */
export const DataFetching2 = () => (
  <div>
    <h1>React App!</h1>
    <Suspense fallback={<p>Loading...</p>}>
      <DataLoader1 />
      <DataLoader2 />
    </Suspense>
  </div>
);

const DataLoader1 = () => {
  const data = useData('dataLoader1', fetchData);

  return <p>data is {data}</p>;
};

const DataLoader2 = () => {
  const data = useData('dataLoader2', fetchData);

  return <p>data is {data}</p>;
};

const dataMap: Map<string, unknown> = new Map();

function useData<T>(cacheKey: string, fetch: () => Promise<T>) {
  const cachedData = dataMap.get(cacheKey) as T | undefined;

  // dataがまだ無ければローディングを開始する
  if (!cachedData) {
    throw fetch().then((d) => {
      dataMap.set(cacheKey, d);
    });
  }

  return cachedData;
}
