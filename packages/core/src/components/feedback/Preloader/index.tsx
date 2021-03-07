import { css, keyframes } from '@emotion/css';
import { Color } from '../../../constants/Style';

type Props = Partial<{
  size: number | 'button';
  theme: 'neutral' | 'inverse';
}>;

const baseSize = 50;

export const Preloader = ({ size = baseSize, theme = 'neutral' }: Props) => {
  const spinnerSize = size === 'button' ? 14 : size;

  const color = theme === 'neutral' ? Color.ThemePrimaryDark : 'white';

  return (
    <svg className={styleBase} width={spinnerSize} height={spinnerSize} viewBox={`0 0 ${baseSize} ${baseSize}`}>
      (
      <circle
        className={stylePath}
        cx={baseSize / 2}
        cy={baseSize / 2}
        r={baseSize / 2 - 5}
        stroke={color}
        fill="none"
        strokeWidth="5"
        strokeMiterlimit="10"
      />
      )
    </svg>
  );
};

const rotateAnimation = keyframes`
  from {
    transform: rotateZ(0);
  }
  to {
    transform: rotateZ(360deg);
  }
`;

const dashAnimation = keyframes`
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124;
  }
`;

const styleBase = css`
  animation: ${rotateAnimation} 1.4s linear infinite;
`;

const stylePath = css`
  stroke-dasharray: 1, 800;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  animation: ${dashAnimation} 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
`;
