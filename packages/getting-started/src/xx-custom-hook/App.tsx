import { useEffect, useState } from 'react';

export const Asyncable = () => {
  const [count, setCount] = useState<any>({});

  useEffect(() => {
    let unmounted = false;
    (async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos/1').then(response => response.json());
      if (!unmounted) {
        setCount(res);
      }
      console.info(1);
    })();
    console.info(0);

    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <>
      <h1>hello</h1>
      <pre>
        <code>{JSON.stringify(count, null, 2)}</code>
      </pre>
    </>
  );
};
