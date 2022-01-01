import { Suspense, useState } from 'react';
import { fetchData } from '../fetchData';
import { Loadable } from './Loadable';

/**
 * @see https://zenn.dev/uhyo/books/react-concurrent-handson/viewer/render-as-you-fetch
 */
export const RenderAsYouFetch = () => {
  const [data1] = useState(() => new Loadable(fetchData()));
  const [data2] = useState(() => new Loadable(fetchData()));
  const [data3] = useState(() => new Loadable(fetchData()));

  return (
    <div>
      <h1>React App!</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <DataLoader data={data1} />
      </Suspense>
      <Suspense fallback={<p>Loading...</p>}>
        <DataLoader data={data2} />
      </Suspense>
      <Suspense fallback={<p>Loading...</p>}>
        <DataLoader data={data3} />
      </Suspense>
    </div>
  );
};

type Props = {
  data: Loadable<string>;
};

const DataLoader = ({ data }: Props) => {
  const value = data.getOrThrow();

  return <p>data is {value}</p>;
};
