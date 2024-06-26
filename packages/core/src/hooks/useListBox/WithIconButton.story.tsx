import { css } from '@emotion/css';
import { useState, type AriaAttributes } from 'react';
import { useListBox } from '.';
import { IconButton } from '../../components/inputs/IconButton';
import { FontSize } from '../../constants/Style';
import { cssVar, gutter } from '../../helpers/Style';

export const Story = () => {
  const menuItems = ['foo', 'bar', 'baz', 'hello', 'world', 'aaa', 'bbb'];

  const { itemProps, active, setActive, triggerProps } = useListBox(menuItems.length);

  const [value, setValue] = useState('');

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
      <IconButton
        ref={triggerProps.ref}
        name="list"
        tabIndex={triggerProps.tabIndex}
        ariaHaspopup={triggerProps['aria-haspopup'] as AriaAttributes['aria-haspopup']}
        ariaExpanded={triggerProps['aria-expanded'] as AriaAttributes['aria-expanded']}
        onKeyDown={triggerProps.onKeyDown}
        onClick={triggerProps.onClick}
      />
      <ul className={styleMenu} role="menu" aria-hidden={!active}>
        {menuItems.map((item, index) => (
          <li key={item}>
            <button
              ref={itemProps[index].ref}
              className={styleMenuItem}
              tabIndex={itemProps[index].tabIndex}
              role={itemProps[index].role}
              onClick={() => {
                handleSelect(item);
              }}
              onKeyDown={itemProps[index].onKeyDown}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
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
