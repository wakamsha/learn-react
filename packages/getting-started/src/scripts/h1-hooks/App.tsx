import * as React from 'react';

type Props = {
  count: number;
};
export function HookApp({ count: initCount }: Props) {
  const [count, setCount] = React.useState<number>(initCount);
  // @MEMO プリミティブ型にしか使えない。
  // オブジェクト型だと値の変更を検知できないため。その場合はコールバックref を使うこと
  const prevCountRef = React.useRef<number>();

  const handleClick = () => setCount(count + 2);

  React.useEffect(() => {
    prevCountRef.current = count;
    document.title = `You clicked ${count} times`;
    return () => console.info('再描画');
  });

  React.useLayoutEffect(() => console.info(1111));

  return (
    <>
      <p>you clicked {count} times</p>
      <p>prev count: {prevCountRef.current}</p>
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
