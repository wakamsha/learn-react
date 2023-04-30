import { css, cx } from '@emotion/css';
import { Icon } from '@learn-react/core/src/components/dataDisplay/Icon';
import { Tooltip } from '@learn-react/core/src/components/dataDisplay/Tooltip';
import { Card } from '@learn-react/core/src/components/surfaces/Card';
import { Popover } from '@learn-react/core/src/components/utils/Popover';
import { Duration, FontSize } from '@learn-react/core/src/constants/Style';
import { cssVar, gutter } from '@learn-react/core/src/helpers/Style';
import { nonNull } from '@learn-react/core/src/helpers/Type';
import { useListBox } from '@learn-react/core/src/hooks/useListBox';
import { useId, useState } from 'react';
import { ToolbarButton } from './ToolbarButton';
import { DeviceSize } from './VO';

type Props = {
  onChange: (value: DeviceSize) => void;
};

export const ViewportSwitch = ({ onChange }: Props) => {
  const [selectedKey, setSelectedKey] = useState<keyof typeof DeviceSize>('unset');

  const { itemProps, active, setActive, triggerProps } = useListBox(Object.keys(DeviceSize).length);

  const id = useId();

  const handleSelect = (key: keyof typeof DeviceSize, value: DeviceSize) => {
    setActive(false);
    setSelectedKey(key);
    onChange(value);
  };

  return (
    <>
      <ToolbarButton
        ref={triggerProps.ref}
        id={id}
        onClick={triggerProps.onClick}
        tabIndex={triggerProps.tabIndex}
        ariaExpanded={triggerProps['aria-expanded']}
        ariaHaspopup={triggerProps['aria-haspopup']}
        active={selectedKey !== 'unset'}
      >
        <Icon name="devices" />
      </ToolbarButton>

      <Popover targetId={id} visible={active} alignment="end">
        <Card shadow="floating">
          <ul role="menu">
            {Object.entries(DeviceSize).map(([key, value], index) => (
              <li key={key}>
                <button
                  ref={itemProps[index].ref}
                  onClick={() => handleSelect(key as keyof typeof DeviceSize, value)}
                  onKeyDown={itemProps[index].onKeyDown}
                  tabIndex={itemProps[index].tabIndex}
                  role={itemProps[index].role}
                  className={cx(styleMenuItem, key === selectedKey && styleMenuItemSelected)}
                >
                  {key}
                  {Object.values(value).every(nonNull) ? (
                    <span className={styleDisplayedValues}>
                      <span>{value.width}</span>
                      <span>x</span>
                      <span>{value.height}</span>
                    </span>
                  ) : null}
                </button>
              </li>
            ))}
          </ul>
        </Card>
      </Popover>

      <Tooltip targetId={id}>Change the viewport</Tooltip>
    </>
  );
};

const styleMenuItem = css`
  display: flex;
  gap: ${gutter(4)};
  justify-content: space-between;
  width: 100%;
  padding: ${gutter(1)} ${gutter(4)};
  font-size: ${FontSize.Small};
  font-weight: bold;
  color: ${cssVar('TextNeutral')};
  text-align: left;
  cursor: pointer;
  background-color: transparent;
  border: none;
  transition: background-color ${Duration.Fade};
  appearance: none;

  &:hover {
    color: white;
    background-color: ${cssVar('ThemePrimaryDark')};
  }

  &:focus {
    color: white;
    background-color: ${cssVar('ThemePrimaryNeutral')};
  }
`;

const styleMenuItemSelected = css`
  color: white;
  cursor: default;
  background-color: ${cssVar('ThemePrimaryNeutral')};
`;

const styleDisplayedValues = css`
  display: flex;
  gap: ${gutter(1)};
  font-size: ${FontSize.Tiny};
  font-weight: normal;
`;
