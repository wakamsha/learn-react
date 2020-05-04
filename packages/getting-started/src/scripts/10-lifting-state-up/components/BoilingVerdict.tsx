import * as React from 'react';

export function BoilingVerdict({ celsius }: { celsius: number }): JSX.Element {
  return celsius >= 100 ? <p>The water would boil.</p> : <p>The water would not boil.</p>;
}
