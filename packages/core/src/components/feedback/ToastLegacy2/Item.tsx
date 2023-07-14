import { css, cx } from '@emotion/css';
import { useEffect, useState, type AnimationEvent, type ReactNode } from 'react';
import { Toast } from '.';
import { Duration, Easing, IconSize } from '../../../constants/Style';
import { cssVar, gutter, square } from '../../../helpers/Style';
import { Icon } from '../../dataDisplay/Icon';

type Props = {
  children: ReactNode;
} & Pick<Toast, 'id' | 'icon' | 'theme'>;

/**
 * 指定のメッセージをトースト UI として表示します。
 * トーストは親である `Container` 内に表示します。
 */
export const Item = ({ children, id, icon, theme = 'primary' }: Props) => {
  const { removeToast } = Toast.useToast();

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
  color: white;
  box-shadow: ${cssVar('ShadowNeutral')};
  animation: base-animation ${Duration.Enter} ${Easing.Enter};

  @keyframes base-animation {
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
    animation: remove-animation ${Duration.Leave} ${Easing.Leave};

    @keyframes remove-animation {
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
