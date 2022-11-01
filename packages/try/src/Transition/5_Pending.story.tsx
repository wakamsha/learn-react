import { Suspense, useState, useTransition } from 'react';
import { fetchData } from './common/fetchData';
import { Loadable } from './common/Loadable';
import { useTime } from './common/useTime';

/**
 * @see https://zenn.dev/uhyo/books/react-concurrent-handson-2/viewer/pending
 */
export const Story = () => {
  const [counter, setCounter] = useState(0);

  const time = useTime();

  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => {
      setCounter(c => {
        console.info(c, '→', c + 1);
        return c + 1;
      });
    });
  };

  return (
    <>
      <button onClick={handleClick}>Counter is {counter}</button>

      <p style={isPending ? { color: 'pink' } : {}}>
        <b>🕒 {time}</b>
      </p>
      <Suspense fallback={<p>Loading...</p>}>
        <ShowData dataKey={counter} />
      </Suspense>
    </>
  );
};

const ShowData = ({ dataKey }: { dataKey: number }) => {
  const data = useData(`ShowData:${dataKey}`, fetchData);

  return (
    <p>
      Data for {dataKey} is {data}
    </p>
  );
};

const dataMap: Map<string, unknown> = new Map();

function useData<T>(cacheKey: string, fetch: () => Promise<T>): T {
  const cachedData = dataMap.get(cacheKey) as Loadable<T> | undefined;

  if (cachedData === undefined) {
    const [loadable, promise] = Loadable.newAndGoPromise(fetch());
    dataMap.set(cacheKey, loadable);
    throw promise;
  }

  return cachedData.getOrThrow();
}
