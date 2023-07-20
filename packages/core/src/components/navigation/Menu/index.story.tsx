import { css } from '@emotion/css';
import { useState } from 'react';
import { useDropdownMenu } from '.';
import { FontSize } from '../../../constants/Style';
import { cssVar, gutter } from '../../../helpers/Style';

export const Story = () => {
  const menuItems = ['foo', 'bar', 'baz', 'hello', 'world', 'aaa', 'bbb'];

  const { buttonProps, itemProps, opened, setOpened } = useDropdownMenu(menuItems.length);

  const [value, setValue] = useState('');

  const handleSelect = (value: string) => {
    setValue(value);
    setOpened(false);
  };

  return (
    <>
      <h2>Basic</h2>
      <button
        ref={buttonProps.ref}
        tabIndex={buttonProps.tabIndex}
        role={buttonProps.role}
        aria-haspopup={buttonProps['aria-haspopup']}
        aria-expanded={buttonProps['aria-expanded']}
        onKeyDown={buttonProps.onKeyDown}
        onClick={buttonProps.onClick}
      >
        Button
      </button>
      <ul className={styleMenu} aria-hidden={!opened} role="menu">
        {menuItems.map((item, index) => (
          <li key={item}>
            <button
              ref={itemProps[index].ref}
              className={styleMenuItem}
              tabIndex={itemProps[index].tabIndex}
              role={itemProps[index].role}
              onClick={() => handleSelect(item)}
              onKeyDown={itemProps[index].onKeyDown}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>

      <pre>
        <code>{JSON.stringify(value, null, 2)}</code>
      </pre>
    </>
  );
};

const styleMenu = css`
  display: none;
  width: 240px;
  max-height: 120px;
  padding: ${gutter(2)} 0;
  overflow: auto;
  font-size: ${FontSize.Regular};
  background-color: ${cssVar('TexturePaper')};
  box-shadow: ${cssVar('ShadowDialog')};

  &[aria-hidden='false'] {
    display: block;
  }

  > :not(:first-child) {
    border-top: 1px solid ${cssVar('LineLight')};
  }
`;

const styleMenuItem = css`
  display: block;
  width: 100%;
  padding: ${gutter(1)} ${gutter(2)};
  text-align: left;
  appearance: none;
  cursor: pointer;
  background: transparent;
  border: none;

  &:hover {
    background-color: ${cssVar('ThemePrimaryLight')};
  }

  &:focus {
    background-color: ${cssVar('ThemePrimaryNeutral')};
  }
`;
