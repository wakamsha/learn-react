import { css } from '@emotion/css';
import { useState } from 'react';
import { useDropdownMenu } from '.';
import { cssVar, gutter } from '../../../helpers/Style';

export const Story = () => {
  const { buttonProps, itemProps, opened } = useDropdownMenu(5);

  const [value, setValue] = useState('');

  return (
    <>
      <h2>Basic</h2>
      <button {...buttonProps}>Button</button>
      <ul className={styleMenu} aria-hidden={!opened} role="menu">
        <li>
          <button onClick={() => setValue('foo')} {...itemProps[0]}>
            foo
          </button>
        </li>
        <li>
          <button onClick={() => setValue('bar')} {...itemProps[1]}>
            bar
          </button>
        </li>
        <li>
          <button onClick={() => setValue('baz')} {...itemProps[2]}>
            baz
          </button>
        </li>
        <li>
          <button onClick={() => setValue('world')} {...itemProps[3]}>
            world
          </button>
        </li>
        <li>
          <button onClick={() => setValue('hello')} {...itemProps[4]}>
            hello
          </button>
        </li>
      </ul>

      <pre>
        <code>{JSON.stringify(value, null, 2)}</code>
      </pre>
    </>
  );
};

const styleMenu = css`
  display: none;
  /* height: 100px; */
  padding: ${gutter(2)} 0;
  overflow: auto;
  border: 1px solid;
  &[aria-hidden='false'] {
    display: block;
  }

  button {
    &:focus {
      color: ${cssVar('ThemeDangerNeutral')};
    }
  }
`;
