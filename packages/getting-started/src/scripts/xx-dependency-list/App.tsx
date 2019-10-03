import * as React from 'react';

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
  console.log(222);
  React.useEffect(() => {
    console.log('changed', item.baz.qux);
  }, [item]);
  const hoge = React.useMemo(() => item.baz.qux * 10, [item]);

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
  console.log(1111111);
  // const [item, setItem] = React.useState(initialItem);
  // const handleClick = () => setItem(item => over(lensPath(['baz', 'qux']), inc, item));
  const handleClick = () => {
    initialItem.baz.qux + 1;
    console.log(99, initialItem.baz.qux);
  };

  return (
    <div>
      <button onClick={handleClick}>click</button>
      <MyComponent item={initialItem} />
    </div>
  );
};
