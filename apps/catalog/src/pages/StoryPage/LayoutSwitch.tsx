import { css, cx } from '@emotion/css';
import { Icon } from '@learn-react/core/src/components/dataDisplay/Icon';
import { Tooltip } from '@learn-react/core/src/components/dataDisplay/Tooltip';
import { Card } from '@learn-react/core/src/components/surfaces/Card';
import { Popover } from '@learn-react/core/src/components/utils/Popover';
import { Duration, FontSize } from '@learn-react/core/src/constants/Style';
import { cssVar, gutter, square } from '@learn-react/core/src/helpers/Style';
import { useListBox } from '@learn-react/core/src/hooks/useListBox';
import { useId } from 'react';
import { LayoutConfigContainer } from './LayoutConfigContainer';
import { ToolbarButton } from './ToolbarButton';
import { Layout } from './VO';

/**
 * Preview と CodeBlock のレイアウトを切り替える UI コンポーネントです。
 */
export const LayoutSwitch = () => {
  const { layoutConfig, setLayoutConfig } = LayoutConfigContainer.useContainer();

  const { itemProps, active, setActive, triggerProps } = useListBox(Object.keys(Layout).length);

  const id = useId();

  const handleSelect = (layoutValue: ValueOf<typeof Layout>) => {
    setActive(false);
    setLayoutConfig(layoutValue);
  };

  return (
    <>
      <ToolbarButton
        ref={triggerProps.ref}
        id={id}
        tabIndex={triggerProps.tabIndex}
        ariaExpanded={triggerProps['aria-expanded']}
        ariaHaspopup={triggerProps['aria-haspopup']}
        onClick={triggerProps.onClick}
      >
        <Icon name="dashboard" />
      </ToolbarButton>

      <Tooltip targetId={id} alignment="end">
        Change the layout
      </Tooltip>

      <Popover targetId={id} visible={active} alignment="end">
        <Card shadow="floating">
          <ul role="menu">
            {Object.entries(Layout).map(([key, value], index) => (
              <li key={key}>
                <button
                  ref={itemProps[index].ref}
                  tabIndex={itemProps[index].tabIndex}
                  role={itemProps[index].role}
                  className={cx(styleMenuItem, value === layoutConfig && styleMenuItemSelected)}
                  onClick={() => handleSelect(value)}
                  onKeyDown={itemProps[index].onKeyDown}
                >
                  <i className={cx(styleVariant[value], value === layoutConfig && styleButtonSelected)} />
                  {value}
                </button>
              </li>
            ))}
          </ul>
        </Card>
      </Popover>
    </>
  );
};

const iconSize = 16;

const styleMenuItem = css`
  display: flex;
  gap: ${gutter(2)};
  align-items: center;
  width: 100%;
  padding: ${gutter(1)} ${gutter(4)};
  font-size: ${FontSize.Small};
  font-weight: bold;
  color: ${cssVar('TextNeutral')};
  text-align: left;
  appearance: none;
  cursor: pointer;
  background-color: transparent;
  border: none;
  transition: background-color ${Duration.Fade};

  &:hover {
    color: white;
    background-color: ${cssVar('ThemePrimaryDark')};
  }

  &:focus {
    color: white;
    background-color: ${cssVar('ThemePrimaryNeutral')};
  }

  &:focus-visible {
    outline: none;
  }
`;

const styleMenuItemSelected = css`
  color: white;
  cursor: default;
  background-color: ${cssVar('ThemePrimaryNeutral')};
`;

const styleButton = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${gutter(1)};
  appearance: none;
  cursor: pointer;
  background-color: ${cssVar('ThemePrimaryDark')};
  border: none;
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }

  &::before,
  &::after {
    display: 'block';
    content: '';
    border: 1px solid white;
  }

  &::after {
    background-color: white;
  }
`;

const styleButtonSelected = css`
  cursor: default;
  background-color: ${cssVar('ThemePrimaryDarker')};
  opacity: 1;
`;

const styleVariant: Frozen<Layout, string> = {
  [Layout.Horizontal]: cx(
    styleButton,
    css`
      &::before,
      &::after {
        width: ${iconSize / 2}px;
        height: ${iconSize}px;
      }

      > :not(:first-child) {
        margin-left: 2px;
      }
    `,
  ),
  [Layout.Vertical]: cx(
    styleButton,
    css`
      flex-direction: column;

      &::before,
      &::after {
        width: ${iconSize}px;
        height: ${iconSize / 2}px;
      }

      > :not(:first-child) {
        margin-top: 2px;
      }
    `,
  ),
  [Layout.Zen]: cx(
    styleButton,
    css`
      &::before {
        ${square(16)}
      }

      &::after {
        content: normal;
      }
    `,
  ),
};
