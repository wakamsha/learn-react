import { css, cx } from '@emotion/css';
import { IconButton } from '@learn-react/core/src/components/inputs/IconButton';
import { Duration, Easing } from '@learn-react/core/src/constants/Style';
import { cssVar, gutter } from '@learn-react/core/src/helpers/Style';
import { type IconName } from '@learn-react/icon';
import { useEffect, useState, type ReactNode } from 'react';
import { Navigation } from './Navigation';
import { ThemeSwitch } from './ThemeSwitch';
import { LayoutMode } from './constants';
import { useLayoutConfig } from './useLayoutConfig';

type Props = {
  children: ReactNode;
};

/**
 * Catalog 全体のレイアウトを司ります。
 *
 * @remarks
 * ナビゲーションの開閉状態はブラウザの LocalStorage で保持・永続化します。
 */
export const Layout = ({ children }: Props) => {
  const [layoutConfig, setLayoutConfig] = useLayoutConfig();

  const [disabled, setDisabled] = useState(false);

  const iconNames: Frozen<LayoutMode, IconName> = {
    [LayoutMode.Neutral]: 'arrow-left',
    [LayoutMode.Zen]: 'list',
  };

  const handleClickToggle = () => {
    setLayoutConfig((mode) => (mode === LayoutMode.Neutral ? LayoutMode.Zen : LayoutMode.Neutral));
  };

  useEffect(() => {
    if (layoutConfig !== LayoutMode.Zen) return;
    // layoutMode を `zen` にした際に強制的に閉じるための処理。
    // DOM を非活性化 ( pointer-events: none ) することで、ポインタのホバー状態を擬似的に無効化する。
    setDisabled(true);
    window.setTimeout(() => {
      setDisabled(false);
    }, delayTime * 2);
  }, [layoutConfig]);

  return (
    <div className={styleBase[layoutConfig]}>
      <div className={styleNavigationWrapper[layoutConfig]} aria-disabled={disabled}>
        <Navigation />
        <div className={styleThemeButtonWrapper[layoutConfig]}>
          <ThemeSwitch />
        </div>
        <div className={styleToggleButtonWrapper[layoutConfig]}>
          <IconButton name={iconNames[layoutConfig]} variant="bare" onClick={handleClickToggle} />
        </div>
      </div>

      <main>{children}</main>
    </div>
  );
};

const delayTime = 300;
const navigationWidth = 256;
const navigationGutter = 64;

const styleBaseBase = css`
  width: 100%;
  height: 100dvh;
  transition: padding-left ${Duration.Fade} ${Easing.Enter};
`;

const styleBase: Frozen<LayoutMode, string> = {
  [LayoutMode.Neutral]: cx(
    styleBaseBase,
    css`
      padding-left: ${navigationWidth}px;
    `,
  ),
  [LayoutMode.Zen]: cx(
    styleBaseBase,
    css`
      padding-left: ${navigationGutter}px;
    `,
  ),
};

const styleNavigationWrapperBase = css`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  height: 100dvh;
  border-right: 1px solid ${cssVar('LineLight')};
  transition:
    left ${Duration.Fade} ${Easing.Enter} ${delayTime}ms,
    width ${Duration.Fade} ${delayTime}ms,
    padding-right ${Duration.Fade} ${delayTime}ms,
    box-shadow ${Duration.Fade};
`;

const styleNavigationWrapper: Frozen<LayoutMode, string> = {
  [LayoutMode.Neutral]: cx(
    styleNavigationWrapperBase,
    css`
      left: 0;
      width: ${navigationWidth}px;
    `,
  ),
  [LayoutMode.Zen]: cx(
    styleNavigationWrapperBase,
    css`
      left: -${navigationWidth}px;
      width: calc(${navigationWidth}px + ${navigationGutter}px);
      padding-right: ${navigationGutter}px;

      &[aria-disabled='false']:hover {
        left: 0;
        width: ${navigationWidth}px;
        padding-right: 0;
        box-shadow: ${cssVar('ShadowDeep')};
      }
    `,
  ),
};

const styleThemeButtonWrapperBase = css`
  position: fixed;
  top: ${gutter(2)};
  left: ${gutter(4)};
  z-index: 2;
`;

const styleThemeButtonWrapper: Frozen<LayoutMode, string> = {
  [LayoutMode.Neutral]: styleThemeButtonWrapperBase,
  [LayoutMode.Zen]: cx(
    styleThemeButtonWrapperBase,
    css`
      visibility: hidden;
      ${`.${styleNavigationWrapper[LayoutMode.Zen]}[aria-disabled='false']:hover &`} {
        visibility: visible;
      }
    `,
  ),
};

const styleToggleButtonWrapperBase = css`
  position: fixed;
  top: ${gutter(2)};
  z-index: 3;
  transition: left ${Duration.Fade} ${Easing.Enter} ${delayTime}ms;
`;

const styleToggleButtonWrapper: Frozen<LayoutMode, string> = {
  [LayoutMode.Neutral]: cx(
    styleToggleButtonWrapperBase,
    css`
      left: calc(${navigationWidth}px - ${gutter(4)} - 32px);
    `,
  ),
  [LayoutMode.Zen]: cx(
    styleToggleButtonWrapperBase,
    css`
      left: ${gutter(4)};
      ${`.${styleNavigationWrapper[LayoutMode.Zen]}[aria-disabled='false']:hover &`} {
        left: calc(${navigationWidth}px - ${gutter(4)} - 32px);
      }
    `,
  ),
};
