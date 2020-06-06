import { css, keyframes } from 'emotion';
import { useToast } from '.';
import React, { ReactNode, useEffect, useRef, useState } from 'react';

type Props = {
  id: number;
  children: ReactNode;
};

export const Item = ({ id, children }: Props): JSX.Element => {
  const { removeToast } = useToast();

  const ref = useRef<HTMLDivElement>(null);

  const [addonStyle, setAddonStyle] = useState('');

  const handleAnimationEnd = () => {
    if (!ref.current) return;

    window.getComputedStyle(ref.current).opacity === '0' && removeToast(id);
  };

  useEffect(() => {
    const timer = window.setTimeout(() => setAddonStyle(removeStyle), 3000);

    return () => window.clearTimeout(timer);
  }, [id, removeToast]);

  return (
    <div className={`${itemStyle} ${addonStyle}`} ref={ref} onAnimationEnd={handleAnimationEnd}>
      {children}
    </div>
  );
};

const itemStyle = css({
  width: 200,
  position: 'relative',
  padding: 16,
  border: `1px solid #d7d7d7`,
  background: 'silver',
  boxShadow: `0px 4px 10px 0px #d7d7d7`,
  animation: `${keyframes({
    from: {
      opacity: 0,
      transform: 'translate3d(200px, 0, 0)',
    },
    to: {
      opacity: 1,
      transform: 'translate3d(0, 0, 0)',
    },
  })} .2s ease-in-out 0s`,
  '& + &': {
    marginTop: 16,
  },
});

const removeStyle = css({
  opacity: 0,
  animation: `${keyframes({
    from: {
      opacity: 1,
      transform: 'translate3d(0, 0, 0)',
    },
    to: {
      opacity: 0,
      transform: 'translate3d(200px, 0, 0)',
    },
  })} .2s linear 0s`,
});
