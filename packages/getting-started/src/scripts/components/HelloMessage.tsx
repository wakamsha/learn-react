import * as React from 'react';

type Props = {
  name: string;
};
export function HelloMessage(props: Props): JSX.Element {
  return <div>Hello {props.name}!</div>;
}
