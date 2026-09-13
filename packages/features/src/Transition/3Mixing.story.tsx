import { startTransition, Suspense, useState } from 'react';
import { fetchData } from './common/fetchData';
import { Loadable } from './common/Loadable';
import { useTime } from './common/useTime';

export const Story = () => {
  const [counter, setCounter] = useState(0);

  const time = useTime();

  const handleClick = () => {
    startTransition(() => {
      setCounter((c) => c + 1);
    });
  };

  return (
    <>
      <button onClick={handleClick}>Counter is {counter}</button>

      <p>🕒 {time}</p>
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

const dataMap = new Map<string, unknown>();

function useData<T>(cacheKey: string, fetch: () => Promise<T>): T {
  // const cachedData = dataMap.get(cacheKey) as T | undefined;

  // if (cachedData === undefined) {
  //   throw fetch().then(data => {
  //     dataMap.set(cacheKey, data);
  //   });
  // }

  // return cachedData;

  const cachedData = dataMap.get(cacheKey) as Loadable<T> | undefined;

  if (cachedData === undefined) {
    const [loadable, promise] = Loadable.newAndGoPromise(fetch());
    dataMap.set(cacheKey, loadable);
    throw promise;
  }

  return cachedData.getOrThrow();
}
