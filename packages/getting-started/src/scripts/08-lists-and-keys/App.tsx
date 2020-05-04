// https://ja.reactjs.org/docs/lists-and-keys.html
import * as React from 'react';

function ListItem({ value }: { value: number }): JSX.Element {
  return <li>{value}</li>;
}

type Props = {
  numbers: number[];
};
export function NumberList(props: Props): JSX.Element {
  const { numbers } = props;
  return (
    <ul>
      {numbers.map(num => (
        <ListItem key={`${num}`} value={num} />
      ))}
    </ul>
  );
}
