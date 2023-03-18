import { css } from '@emotion/css';
import { cssVar } from '../../../helpers/Style';

type Size = 'neutral' | 'button';

type Theme = 'neutral' | 'inverse';

type Props = Partial<{
  size: Size;
  theme: Theme;
}>;

/**
 * 不特定多数の待ち時間を表現したり、処理の長さを表示するスピナー型の UI です。
 *
 * @param props
 */
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

const styleBase = css`
  animation: rotate-animation 1.4s linear infinite;

  @keyframes rotate-animation {
    from {
      transform: rotateZ(0);
    }

    to {
      transform: rotateZ(360deg);
    }
  }
`;

const stylePath = css`
  stroke-dasharray: 1, 800;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  animation: dash-animation 1.5s ease-in-out infinite, color 6s ease-in-out infinite;

  @keyframes dash-animation {
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
  }
`;

const styleSize: Frozen<Size, number> = {
  neutral: baseSize,
  button: 18,
};

const styleTheme: Frozen<Theme, string> = {
  neutral: cssVar('ThemePrimaryDark'),
  inverse: 'white',
};
