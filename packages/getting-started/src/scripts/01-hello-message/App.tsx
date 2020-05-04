// https://ja.reactjs.org/docs/hello-world.html
import React from 'react';

type Props = {
  name: string;
};
export function HelloMessage({ name }: Props): JSX.Element {
  return <div>Hello {name}!</div>;
}
