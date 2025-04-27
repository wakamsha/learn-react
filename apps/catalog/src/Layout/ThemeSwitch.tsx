import { css } from '@emotion/css';
import { Icon } from '@learn-react/core/src/components/dataDisplay/Icon';
import { Tooltip } from '@learn-react/core/src/components/dataDisplay/Tooltip';
import { IconButton } from '@learn-react/core/src/components/inputs/IconButton';
import { Popover } from '@learn-react/core/src/components/utils/Popover';
import { StorageProxy } from '@learn-react/core/src/helpers/Storage';
import { square } from '@learn-react/core/src/helpers/Style';
import { useListBox } from '@learn-react/core/src/hooks/useListBox';
import { type IconName } from '@learn-react/icon';
import { useEffect, useId, useState } from 'react';
import { ListMenu } from '../components/ListMenu';

type MenuItem = {
  icon: IconName;
  label: string;
  value: Theme;
};

/**
 * ThemeConfig コンポーネントは、テーマの設定を行うためのコンポーネントです。
 */
export const ThemeSwitch = () => {
  const menuItems: MenuItem[] = [
    {
      icon: 'contrast',
      label: 'OS Default',
      value: 'auto',
    },
    {
      icon: 'light-mode',
      label: 'Light',
      value: 'light',
    },
    {
      icon: 'dark-mode',
      label: 'Dark',
      value: 'dark',
    },
  ];

  const storageKey = 'THEME';

  // eslint-disable-next-line react/hook-use-state
  const [storage] = useState(() => new StorageProxy('localStorage'));

  const [currentItem, setCurrentItem] = useState<MenuItem>(() => {
    const storedValue = storage.getValue(storageKey);
    return menuItems.find((item) => item.value === storedValue) ?? menuItems[0];
  });

  const id = useId();

  const { itemProps, active, setActive, triggerProps } = useListBox(menuItems.length);

  const handleSelect = (item: MenuItem) => {
    setCurrentItem(item);
    storage.setValue(storageKey, item.value);
    setActive(false);
  };

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    if (currentItem.value === 'auto') {
      return;
    }
    document.documentElement.classList.add(currentItem.value);

    storage.setValue(storageKey, currentItem.value);
  }, [currentItem, storage]);

  return (
    <>
      <IconButton
        ref={triggerProps.ref}
        id={id}
        name={currentItem.icon}
        variant="bare"
        tabIndex={triggerProps.tabIndex}
        ariaHaspopup={triggerProps['aria-haspopup']}
        ariaExpanded={triggerProps['aria-expanded']}
        onClick={triggerProps.onClick}
        onKeyDown={triggerProps.onKeyDown}
      />

      <Tooltip targetId={id} alignment="start">
        Change the theme
      </Tooltip>

      <Popover targetId={id} visible={active} alignment="start">
        <ListMenu active={active}>
          {menuItems.map((item, index) => (
            <ListMenu.Item
              key={item.label}
              ref={itemProps[index].ref}
              tabIndex={itemProps[index].tabIndex}
              role={itemProps[index].role}
              selected={item.value === currentItem.value}
              onClick={() => {
                handleSelect(item);
              }}
              onKeyDown={itemProps[index].onKeyDown}
            >
              <span className={styleIcon}>
                <Icon name={item.icon} />
              </span>
              <span className={styleLabel}>{item.label}</span>
            </ListMenu.Item>
          ))}
        </ListMenu>
      </Popover>
    </>
  );
};

const iconSize = 24;

const styleIcon = css`
  ${square(iconSize)};
`;

const styleLabel = css`
  white-space: break-spaces;
`;

/**
 * テーマの設定値を定義した型。
 *
 * @remarks
 * - 'auto': OS のテーマ設定に従います。
 * - 'light': 明るいテーマを適用します。
 * - 'dark': 暗いテーマを適用します。
 */
const Theme = ['auto', 'light', 'dark'] as const;

/**
 * テーマの設定値を定義した型。
 *
 * @remarks
 * - 'auto': システムのテーマ設定に従います。
 * - 'light': 明るいテーマを適用します。
 * - 'dark': 暗いテーマを適用します。
 */
type Theme = (typeof Theme)[number];
