import { Suspense, useState } from 'react';
import { fetchData } from './fetchData';

/**
 * @see https://zenn.dev/uhyo/books/react-concurrent-handson/viewer/data-fetching-1
 */
export const DataFetching1 = () => (
  <div>
    <h1>React App!</h1>
    <Suspense fallback={<p>Loading...</p>}>
      <DataLoader />
    </Suspense>
  </div>
);

const DataLoader = () => {
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<string | null>(null);

  console.info('DataLoader is rendered');

  // dataがまだ無ければローディングを開始する
  if (loading && data === null) {
    throw fetchData().then(setData);
  }

  // データがあればそれを表示
  return (
    <>
      <p>data is {data}</p>
      <button className="border p-1" onClick={() => setLoading(true)}>
        load
      </button>
    </>
  );
};
