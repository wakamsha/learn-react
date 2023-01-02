import { css } from '@linaria/core';
import { useId, useState } from 'react';
import { useListBox } from '.';
import { Popover } from '../../components/utils/Popover';
import { FontSize } from '../../constants/Style';
import { cssVar, gutter } from '../../helpers/Style';

export const Story = () => {
  const menuItems = ['foo', 'bar', 'baz', 'hello', 'world', 'aaa', 'bbb'];

  const { itemProps, active, setActive, triggerProps } = useListBox(menuItems.length);

  const [value, setValue] = useState('');

  const id = useId();

  const handleSelect = (value: string) => {
    setValue(value);
    setActive(false);
  };

  return (
    <>
      <pre>
        <code>{JSON.stringify(value, null, 2)}</code>
      </pre>
      <hr />
      <button
        id={id}
        ref={triggerProps.ref}
        onKeyDown={triggerProps.onKeyDown}
        onClick={triggerProps.onClick}
        tabIndex={triggerProps.tabIndex}
        role={triggerProps.role}
        aria-haspopup={triggerProps['aria-haspopup']}
        aria-expanded={triggerProps['aria-expanded']}
      >
        Open
      </button>
      <Popover targetId={id} visible={active} alignment="start">
        <ul className={styleMenu} role="menu" aria-hidden={!active}>
          {menuItems.map((item, index) => (
            <li key={item}>
              <button
                className={styleMenuItem}
                onClick={() => handleSelect(item)}
                onKeyDown={itemProps[index].onKeyDown}
                tabIndex={itemProps[index].tabIndex}
                role={itemProps[index].role}
                ref={itemProps[index].ref}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </Popover>
    </>
  );
};

const styleMenu = css`
  width: 240px;
  max-height: 120px;
  padding: ${gutter(2)} 0;
  overflow: auto;
  font-size: ${FontSize.Regular};
  background-color: ${cssVar('TexturePaper')};
  box-shadow: ${cssVar('ShadowDialog')};

  > :not(:first-child) {
    border-top: 1px solid ${cssVar('LineLight')};
  }
`;

const styleMenuItem = css`
  display: block;
  width: 100%;
  padding: ${gutter(1)} ${gutter(2)};
  text-align: left;
  cursor: pointer;
  background: transparent;
  border: none;
  appearance: none;

  &:hover {
    background-color: ${cssVar('ThemePrimaryLight')};
  }

  &:focus {
    background-color: ${cssVar('ThemePrimaryNeutral')};
  }
`;
