/* eslint-disable react-hooks/purity */
import { Suspense, useState } from 'react';

export const Story = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>React App!</h1>
      <RenderingNotifier name="outside-Suspense" />
      <Suspense fallback={<p>Loading...</p>}>
        {/* <AlwaysSuspend /> */}
        <SometimesSuspend />
        <RenderingNotifier name="inside-Suspense" />
        <button
          onClick={() => {
            setCount((state) => state + 1);
          }}
        >
          {count}
        </button>
      </Suspense>
    </div>
  );
};

// const AlwaysSuspend = () => {
//   console.info('AlwaysSuspend is rendered');
//   throw sleep(2000);
// };

const SometimesSuspend = () => {
  console.info('SometimesSuspend is rendered');

  if (Math.random() < 0.5) {
    throw sleep(2000);
  }

  return <p>Hello, World!!</p>;
};

type Props = {
  name: string;
};

const RenderingNotifier = ({ name }: Props) => {
  console.info(`${name} is rendered.`);

  return null;
};

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}
