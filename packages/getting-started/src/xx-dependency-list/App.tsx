/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useMemo } from 'react';

type Item = {
  foo: string;
  bar: number;
  baz: {
    qux: number;
    quux: {
      deepFoo: string;
    };
  };
};

type Props = {
  item: Item;
};

const MyComponent = ({ item }: Props) => {
  console.info(222);
  useEffect(() => {
    console.info('changed', item.baz.qux);
  }, [item]);
  const hoge = useMemo(() => item.baz.qux * 10, [item]);

  return <p>{hoge}</p>;
};

const initialItem = {
  foo: 'foo',
  bar: 0,
  baz: {
    qux: 100,
    quux: {
      deepFoo: 'I am deepFoo',
    },
  },
};

export const EqualApp = () => {
  console.info(1111111);
  // const [item, setItem] = useState(initialItem);
  // const handleClick = () => setItem(item => over(lensPath(['baz', 'qux']), inc, item));
  const handleClick = () => {
    initialItem.baz.qux + 1;
    console.info(99, initialItem.baz.qux);
  };

  return (
    <div>
      <button onClick={handleClick}>click</button>
      <MyComponent item={initialItem} />
    </div>
  );
};
