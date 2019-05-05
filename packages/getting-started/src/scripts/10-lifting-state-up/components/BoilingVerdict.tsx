import * as React from 'react';

export function BoilingVerdict(props: { celsius: number }): JSX.Element {
  return props.celsius >= 100 ? <p>The water would boil.</p> : <p>The water would not boil.</p>;
}
