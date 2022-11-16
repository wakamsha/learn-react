import { css, cx } from '@linaria/core';
import type { AnimationEvent, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import type { Toast } from '.';
import { useRemoveToast } from '.';
import { Duration, Easing, FontSize, IconSize } from '../../../constants/Style';
import { cssVar, gutter, square } from '../../../helpers/Style';
import { Icon } from '../../dataDisplay/Icon';

type Props = {
  children: ReactNode;
} & Pick<Toast, 'id' | 'icon' | 'theme'>;

export const Item = ({ children, id, icon, theme = 'primary' }: Props) => {
  const removeToast = useRemoveToast();

  const [styleAddon, setStyleAddon] = useState('');

  const handleAnimationEnd = (e: AnimationEvent<HTMLDivElement>) => {
    if (window.getComputedStyle(e.currentTarget).opacity === '0') {
      removeToast(id);
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setStyleAddon(styleRemove);
    }, hideDurationTime);

    return () => {
      window.clearTimeout(timer);
    };
  }, [id, removeToast]);

  return (
    <div className={`${styleBase} ${Theme[theme]} ${styleAddon}`} onAnimationEnd={handleAnimationEnd}>
      {icon ? <Icon name={icon} /> : null}
      <span>{children}</span>
    </div>
  );
};

const hideDurationTime = 5000;

const styleBase = css`
  position: relative;
  display: flex;
  align-items: center;
  min-width: 256px;
  max-width: 30vw;
  padding: ${gutter(4)} ${gutter(5)} ${gutter(4)} ${gutter(4)};
  font-size: ${FontSize.Regular};
  color: white;
  box-shadow: ${cssVar('ShadowNeutral')};
  animation: baseAnimation ${Duration.Enter} ${Easing.Enter};

  @keyframes baseAnimation {
    from {
      opacity: 0;
      transform: translate3d(-10%, 0, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  > :not(:first-child) {
    margin-left: ${gutter(1)};
  }

  > svg {
    flex: 0 0 auto;
    fill: white;
    ${square(IconSize.Large)}
  }
`;

const styleRemove = cx(
  styleBase,
  css`
    opacity: 0;
    animation: removeAnimation ${Duration.Leave} ${Easing.Leave};

    @keyframes removeAnimation {
      from {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
      to {
        opacity: 0;
        transform: translate3d(-40%, 0, 0);
      }
    }
  `,
);

const Theme = {
  primary: css`
    background-color: ${cssVar('ThemePrimaryNeutral')};
  `,
  danger: css`
    background-color: ${cssVar('ThemeDangerNeutral')};
  `,
} as const;
