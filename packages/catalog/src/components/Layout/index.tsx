import { IconButton } from '@learn-react/core/components/inputs/IconButton';
import { Duration, Easing } from '@learn-react/core/constants/Style';
import { cssVar, gutter } from '@learn-react/core/helpers/Style';
import type { LinariaClassName } from '@linaria/core';
import { css, cx } from '@linaria/core';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { Navigation } from '../Navigation';

type Props = {
  children: ReactNode;
};

type LayoutMode = 'neutral' | 'zen';

export const Layout = ({ children }: Props) => {
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('neutral');

  const [disabled, setDisabled] = useState(false);

  const handleClickToggle = () => {
    setLayoutMode(mode => (mode === 'neutral' ? 'zen' : 'neutral'));
  };

  useEffect(() => {
    if (layoutMode !== 'zen') return;
    // layoutMode を `zen` にした際に強制的に閉じるための処理。
    // DOM を非活性化 ( pointer-events: none ) することで、ポインタのホバー状態を擬似的に無効化する。
    setDisabled(true);
    window.setTimeout(() => {
      setDisabled(false);
    }, delayTime * 2);
  }, [layoutMode]);

  return (
    <div className={styleBase[layoutMode]}>
      <div className={styleNavigationWrapper[layoutMode]} aria-disabled={disabled}>
        <Navigation />
        <div className={styleToggleButtonWrapper[layoutMode]}>
          <IconButton
            name={layoutMode === 'neutral' ? 'arrow-left' : 'list'}
            variant="bare"
            onClick={handleClickToggle}
          />
        </div>
      </div>

      <main>{children}</main>
    </div>
  );
};

const delayTime = 300;
const navigationWidth = 272;
const navigationGutter = 48;

const styleBaseBase = css`
  width: 100%;
  height: 100dvh;
  transition: padding-left ${Duration.Fade} ${Easing.Enter};
`;

const styleBase: Frozen<LayoutMode, LinariaClassName> = {
  neutral: cx(
    styleBaseBase,
    css`
      padding-left: ${navigationWidth}px;
    `,
  ),
  zen: cx(
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
  transition: left ${Duration.Fade} ${Easing.Enter} ${delayTime}ms, width ${Duration.Fade} ${delayTime}ms,
    padding-right ${Duration.Fade} ${delayTime}ms, box-shadow ${Duration.Fade};
`;

const styleNavigationWrapper: Frozen<LayoutMode, LinariaClassName> = {
  neutral: cx(
    styleNavigationWrapperBase,
    css`
      left: 0;
      width: ${navigationWidth}px;
    `,
  ),
  zen: cx(
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

const styleToggleButtonWrapperBase = css`
  position: fixed;
  top: ${gutter(4)};
  z-index: 2;
  transition: left ${Duration.Fade} ${Easing.Enter};
`;

const styleToggleButtonWrapper: Frozen<LayoutMode, LinariaClassName> = {
  neutral: cx(
    styleToggleButtonWrapperBase,
    css`
      left: calc(${navigationWidth}px - ${gutter(4)} - 32px);
    `,
  ),
  zen: cx(
    styleToggleButtonWrapperBase,
    css`
      left: ${gutter(2)};
    `,
  ),
};
