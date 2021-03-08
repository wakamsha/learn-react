import { css, keyframes } from '@emotion/css';
import { Color } from '../../../constants/Style';

type Size = 'neutral' | 'button';

type Theme = 'neutral' | 'inverse';

type Props = Partial<{
  size: Size;
  theme: Theme;
}>;

export const Preloader = ({ size = 'neutral', theme = 'neutral' }: Props) => {
  const spinnerSize = styleSize[size];

  const color = styleTheme[theme];

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

const baseSize = 50;

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

const styleSize: Frozen<Size, number> = {
  neutral: baseSize,
  button: 18,
};

const styleTheme: Frozen<Theme, string> = {
  neutral: Color.ThemePrimaryDark,
  inverse: 'white',
};
