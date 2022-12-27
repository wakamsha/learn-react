import { cssVar, gutter, square } from '@learn-react/core/helpers/Style';
import { css, cx } from '@linaria/core';
import type { MouseEvent } from 'react';
import { LayoutConfigContainer } from './LayoutConfigContainer';
import { Layout } from './VO';

export const LayoutSwitch = () => {
  const { layoutConfig, setLayoutConfig } = LayoutConfigContainer.useContainer();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => setLayoutConfig(e.currentTarget.dataset.layout as Layout);

  return (
    <div role="menubar" className={styleBase}>
      <button
        className={cx(styleVariant[Layout.Horizontal], layoutConfig === Layout.Horizontal && styleButtonSelected)}
        role="menuitem"
        data-layout={Layout.Horizontal}
        onClick={handleClick}
      />
      <button
        className={cx(styleVariant[Layout.Vertical], layoutConfig === Layout.Vertical && styleButtonSelected)}
        role="menuitem"
        data-layout={Layout.Vertical}
        onClick={handleClick}
      />
      <button
        className={cx(styleVariant[Layout.Zen], layoutConfig === Layout.Zen && styleButtonSelected)}
        role="menuitem"
        data-layout={Layout.Zen}
        onClick={handleClick}
      />
    </div>
  );
};

const iconSize = 16;

const styleBase = css`
  display: flex;
  gap: ${gutter(1)};
`;

const styleButton = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${gutter(1)};
  cursor: pointer;
  background-color: ${cssVar('ThemePrimaryDark')};
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
