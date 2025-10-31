import { startTransition, Suspense, useState } from 'react';
import { fetchData } from './common/fetchData';

export const Story = () => {
  const [counter1, setCounter1] = useState(0);
  const handleClick1 = () => {
    setCounter1(counter1 + 1);
  };

  const [counter2, setCounter2] = useState(0);
  const handleClick2 = () => {
    startTransition(() => {
      // setCounter2(counter2 + 1);
      // @see https://zenn.dev/uhyo/books/react-concurrent-handson-2/viewer/branching#世界の分岐を体験する
      setCounter2((c) => c + 1);
    });
  };

  return (
    <>
      <h2>No Transition</h2>
      <button onClick={handleClick1}>Counter is {counter1}</button>
      <Suspense fallback={<p>Loading...</p>}>
        <ShowData dataKey={counter1} />
      </Suspense>

      <h2>With Transition</h2>
      <button onClick={handleClick2}>Counter is {counter2}</button>

      <Suspense fallback={<p>Loading...</p>}>
        <ShowData dataKey={counter2} />
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
  const cachedData = dataMap.get(cacheKey) as T | undefined;

  if (cachedData === undefined) {
    throw fetch().then((data) => {
      dataMap.set(cacheKey, data);
    });
  }

  return cachedData;
}
