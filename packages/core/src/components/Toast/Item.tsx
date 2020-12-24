import { css, keyframes } from 'emotion';
import { AnimationEvent, ReactNode, useEffect, useState } from 'react';
import { Duration, Easing } from '../../constants/Style';
import { gutter } from '../../helpers/Style';
import { Toast, useToast } from '.';

type Props = {
  id: number;
  children: ReactNode;
  theme: Toast['theme'];
};

export const Item = ({ id, children, theme = 'success' }: Props) => {
  const { removeToast } = useToast();

  const [addonStyle, setAddonStyle] = useState('');

  const handleAnimationEnd = (e: AnimationEvent<HTMLDivElement>) =>
    window.getComputedStyle(e.currentTarget).opacity === '0' && removeToast(id);

  useEffect(() => {
    const timer = window.setTimeout(() => setAddonStyle(removeStyle), hideDurationTime);

    return () => window.clearTimeout(timer);
  }, [id, removeToast]);

  return (
    <div className={`${itemStyle} ${Theme[theme]} ${addonStyle}`} onAnimationEnd={handleAnimationEnd}>
      {children}
    </div>
  );
};

const hideDurationTime = 5000;

const itemStyle = css`
  position: relative;
  min-width: 256px;
  padding: ${gutter(4)};
  background: white;
  border: 1px solid #d7d7d7;
  box-shadow: 0px 4px 10px 0px #d7d7d7;
  animation: ${keyframes`
    from {
      opacity: ${0};
      transform: translate3d(-10%, 0, 0);
    }
    to {
      opacity: ${1};
      transform: translate3d(0, 0, 0);
    }
  `} ${Duration.Enter} ${Easing.Enter};

  & + & {
    margin-bottom: ${gutter(4)};
  }
`;

const removeStyle = css`
  opacity: 0;
  animation: ${keyframes`
    from {
      opacity: ${1};
      transform: translate3d(0, 0, 0);
    }
    to {
      opacity: ${0};
      transform: translate3d(-40%, 0, 0);
    }
  `} ${Duration.Leave} ${Easing.Leave};
`;

const Theme = {
  danger: css`
    background: red;
  `,
  success: css`
    background: lime;
  `,
} as const;
