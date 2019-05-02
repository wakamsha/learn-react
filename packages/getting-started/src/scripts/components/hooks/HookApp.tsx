import * as React from 'react';

type Props = {
  count: number;
};
export function HookApp(props: Props) {
  const [count, setCount] = React.useState<number>(props.count);
  const handleClick = () => setCount(count + 2);
  React.useEffect(() => {
    document.title = `You clicked ${count} times`;
    return () => console.log('再描画');
  });
  return (
    <>
      <p>you clicked {count} times</p>
      <button onClick={handleClick}>Click me</button>
    </>
  );
  // const [count, setCount] = React.useState(0);
  // return (
  //   <>
  //     <p>you clicked {count} times</p>
  //     <button onClick={() => setCount(count + 1))}>Click me</button>
  //   </>
  // );
}
