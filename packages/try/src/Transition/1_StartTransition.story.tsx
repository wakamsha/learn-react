import { startTransition, Suspense, useState } from 'react';

/**
 * @see https://zenn.dev/uhyo/books/react-concurrent-handson-2/viewer/use-starttransition
 */
export const Story = () => {
  const [sleepIsShown, setSleepIsShown] = useState(false);

  const handleClick = () => {
    startTransition(() => {
      setSleepIsShown(true);
    });
  };
  return (
    <>
      <p>
        <button onClick={handleClick}>Show Sleep</button>
      </p>
      <Suspense fallback={<p>loading...</p>}>{sleepIsShown ? <Sleep /> : null}</Suspense>
    </>
  );
};

let sleeping = true;

const Sleep = () => {
  if (sleeping) {
    throw sleep(1000).then(() => {
      sleeping = false;
    });
  }

  return <p>Hello!</p>;
};

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => {
    window.setTimeout(resolve, ms);
  });
}
