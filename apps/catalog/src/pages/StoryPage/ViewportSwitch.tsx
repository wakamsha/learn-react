import { css } from '@emotion/css';
import { Icon } from '@learn-react/core/src/components/dataDisplay/Icon';
import { Tooltip } from '@learn-react/core/src/components/dataDisplay/Tooltip';
import { Popover } from '@learn-react/core/src/components/utils/Popover';
import { FontSize } from '@learn-react/core/src/constants/Style';
import { gutter } from '@learn-react/core/src/helpers/Style';
import { nonNull } from '@learn-react/core/src/helpers/Type';
import { useListBox } from '@learn-react/core/src/hooks/useListBox';
import { useId, useState } from 'react';
import { ListMenu } from '../../components/ListMenu';
import { ToolbarButton } from './ToolbarButton';
import { DeviceSize } from './ValueObject';

type Props = {
  onChange: (value: DeviceSize) => void;
};

/**
 * Preview のビューポートを切り替える UI コンポーネントです。
 */
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
        tabIndex={triggerProps.tabIndex}
        ariaExpanded={triggerProps['aria-expanded']}
        ariaHaspopup={triggerProps['aria-haspopup']}
        active={selectedKey !== 'unset'}
        onClick={triggerProps.onClick}
      >
        <Icon name="devices" />
      </ToolbarButton>

      <Tooltip targetId={id}>Change the viewport</Tooltip>

      <Popover targetId={id} visible={active} alignment="end">
        <ListMenu active={active}>
          {Object.entries(DeviceSize).map(([key, value], index) => (
            <ListMenu.Item
              key={key}
              ref={itemProps[index].ref}
              tabIndex={itemProps[index].tabIndex}
              role={itemProps[index].role}
              selected={key === selectedKey}
              gap="Medium"
              onClick={() => {
                handleSelect(key as keyof typeof DeviceSize, value);
              }}
              onKeyDown={itemProps[index].onKeyDown}
            >
              {key}
              {Object.values(value).every(nonNull) ? (
                <span className={styleDisplayedValues}>
                  <span>{value.width}</span>
                  <span>x</span>
                  <span>{value.height}</span>
                </span>
              ) : null}
            </ListMenu.Item>
          ))}
        </ListMenu>
      </Popover>
    </>
  );
};

const styleDisplayedValues = css`
  display: flex;
  gap: ${gutter(1)};
  font-size: ${FontSize.Tiny};
  font-weight: normal;
`;
