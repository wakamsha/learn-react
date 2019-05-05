import * as React from 'react';
import { Button } from './Button';

type Props = {
  changeTheme: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export function Toolbar(props: Props) {
  return (
    <nav>
      <Button label="foo" onClick={props.changeTheme} />
      <Button label="bar" onClick={props.changeTheme} />
      <Button label="baz" onClick={props.changeTheme} />
    </nav>
  );
}
