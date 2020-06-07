import { Toast, useToast } from '.';
// import { css, keyframes } from 'emotion';
import React, { AnimationEvent, ReactNode, useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

type Props = {
  id: number;
  children: ReactNode;
  theme: Toast['theme'];
};

export const Item = ({ id, children, theme = 'success' }: Props): JSX.Element => {
  const { removeToast } = useToast();

  // const [addonStyle, setAddonStyle] = useState('');
  const [isRemoving, setIsRemoving] = useState(false);

  const handleAnimationEnd = (e: AnimationEvent<HTMLDivElement>) =>
    window.getComputedStyle(e.currentTarget).opacity === '0' && removeToast(id);

  useEffect(() => {
    // const timer = window.setTimeout(() => setAddonStyle(removeStyle), hideDurationTime);
    const timer = window.setTimeout(() => setIsRemoving(true), hideDurationTime);

    return () => window.clearTimeout(timer);
  }, [id, removeToast]);

  return (
    // <div className={`${itemStyle} ${Theme[theme]} ${addonStyle}`} onAnimationEnd={handleAnimationEnd}>
    //   {children}
    // </div>
    <StyledBase colorTheme={theme} isRemoving={isRemoving} onAnimationEnd={handleAnimationEnd}>
      {children}
    </StyledBase>
  );
};

const hideDurationTime = 5000;

// const itemStyle = css({
//   minWidth: 256,
//   position: 'relative',
//   padding: 16,
//   border: `1px solid #d7d7d7`,
//   background: 'silver',
//   boxShadow: `0px 4px 10px 0px #d7d7d7`,
//   animation: `${keyframes({
//     from: {
//       opacity: 0,
//       transform: 'translate3d(-10%, 0, 0)',
//     },
//     to: {
//       opacity: 1,
//       transform: 'translate3d(0, 0, 0)',
//     },
//   })} .2s ease-in-out`,
//   '& + &': {
//     marginBottom: 16,
//   },
// });

// const removeStyle = css({
//   opacity: 0,
//   animation: `${keyframes({
//     from: {
//       opacity: 1,
//       transform: 'translate3d(0, 0, 0)',
//     },
//     to: {
//       opacity: 0,
//       transform: 'translate3d(-40%, 0, 0)',
//     },
//   })} .2s ease-in-out`,
// });

// const Theme = {
//   danger: css({
//     background: 'red',
//   }),
//   success: css({
//     background: 'lime',
//   }),
// };

const showAnimation = keyframes`
  from {
    opacity: 0;
    transform: translate3d(-10%, 0, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const hideAnimation = keyframes`
  from {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  to {
    opacity: 0;
    transform: translate3d(-50%, 0, 0);
  }
`;

const StyledBase = styled.div<{ colorTheme: Props['theme']; isRemoving: boolean }>`
  position: relative;
  min-width: 256px;
  padding: 8px 16px;
  border: 1px solid #b1b2b2;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
  animation: ${showAnimation} 0.25s cubic-bezier(0.11, 0.57, 0.14, 1);

  ${({ colorTheme }) => colorTheme !== undefined && Theme[colorTheme]}

  ${({ isRemoving }) =>
    isRemoving &&
    css`
      opacity: 0;
      animation: ${hideAnimation} 0.3s cubic-bezier(0, 0.14, 0.75, 1);
    `}

  & + & {
    margin-bottom: 16px;
  }
`;

const Theme = {
  danger: css`
    background: #d92b57;
  `,
  success: css`
    background: #56d99a;
  `,
} as const;
