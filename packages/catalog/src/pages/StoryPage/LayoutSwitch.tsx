import { css, cx } from '@emotion/css';
import { Color } from '@learn-react/core/constants/Style';
import { gutter, square } from '@learn-react/core/helpers/Style';
import { MouseEvent } from 'react';
import { Layout } from '../../constants/VO';
import { LayoutConfigContainer } from '../../containers/LayoutConfigContainer';

export const LayoutSwitch = () => {
  const { layoutConfig, setLayoutConfig } = LayoutConfigContainer.useContainer();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) =>
    setLayoutConfig(Number(e.currentTarget.dataset.layout) as Layout);

  return (
    <div role="menubar" className={styleBase}>
      <button
        className={cx(styleVariant[Layout.Column], layoutConfig === Layout.Column && styleButtonSelected)}
        role="menuitem"
        data-layout={Layout.Column}
        onClick={handleClick}
      />
      <button
        className={cx(styleVariant[Layout.Row], layoutConfig === Layout.Row && styleButtonSelected)}
        role="menuitem"
        data-layout={Layout.Row}
        onClick={handleClick}
      />
      <button
        className={cx(styleVariant[Layout.Full], layoutConfig === Layout.Full && styleButtonSelected)}
        role="menuitem"
        data-layout={Layout.Full}
        onClick={handleClick}
      />
    </div>
  );
};

const ICON_SIZE = 18;

const styleBase = css`
  position: fixed;
  right: ${gutter(4)};
  bottom: ${gutter(4)};
  z-index: 1;
  display: flex;

  > :not(:first-child) {
    margin-left: ${gutter(1)};
  }
`;

const styleButton = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px ${gutter(2)};
  cursor: pointer;
  background-color: ${Color.ThemePrimaryDark};
  border: none;
  opacity: 0.8;
  appearance: none;

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
  background-color: ${Color.ThemePrimaryDarker};
  opacity: 1;
`;

const styleVariant: Frozen<Layout, string> = {
  [Layout.Column]: cx(
    styleButton,
    css`
      &::before,
      &::after {
        width: ${(ICON_SIZE - 2) / 2}px;
        height: ${ICON_SIZE}px;
      }

      > :not(:first-child) {
        margin-left: 2px;
      }
    `,
  ),
  [Layout.Row]: cx(
    styleButton,
    css`
      flex-direction: column;
      &::before,
      &::after {
        width: ${ICON_SIZE}px;
        height: ${(ICON_SIZE - 2) / 2}px;
      }

      > :not(:first-child) {
        margin-top: 2px;
      }
    `,
  ),
  [Layout.Full]: cx(
    styleButton,
    css`
      &::before {
        ${square(20)}
      }
      &::after {
        content: normal;
      }
    `,
  ),
};
