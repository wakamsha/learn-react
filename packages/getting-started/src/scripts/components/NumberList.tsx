import * as React from 'react';

function ListItem(props: { value: number }): JSX.Element {
  return <li>{props.value}</li>;
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
