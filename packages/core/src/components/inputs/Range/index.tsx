import { css, cx } from '@emotion/css';
import { ChangeEvent } from 'react';
import { BorderRadius, Color, Duration } from '../../../constants/Style';
import { square } from '../../../helpers/Style';

type Theme = 'primary' | 'danger';

type Props = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  theme?: Theme;
};

export const Range = ({ value, onChange, min = 0, max = 100, step = 1, disabled, theme = 'primary' }: Props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => onChange(Number(e.target.value));

  return (
    <input
      className={cx(styleBase, filledTrack(styleTheme[theme], (value / max) * 100))}
      type="range"
      value={value}
      onChange={handleChange}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
    />
  );
};

function filledTrack(color: Color, ratio: number) {
  return css({
    '&::-webkit-slider-runnable-track': {
      background: `linear-gradient(to right, ${color} 0%, ${color} ${ratio}%, ${Color.LineDefault} ${ratio}%)`,
    },
    '&::-moz-range-track': {
      background: `linear-gradient(to right, ${color} 0%, ${color} ${ratio}%, ${Color.LineDefault} ${ratio}%)`,
    },
  });
}

const diameter = 24;

const thumb = css`
  margin-top: -${diameter / 2}px;
  cursor: pointer;
  background-color: white;
  border: 1px solid ${Color.LineDefault};
  border-radius: ${BorderRadius.Circle};
  transition: transform ${Duration.Fade};
  transform: scale3d(1, 1, 1);
  ${square(diameter)}

  &:active {
    transform: scale3d(1.2, 1.2, 1);
  }
`;

const track = css`
  width: 100%;
  height: 2px;
  background-color: ${Color.LineDefault};
  border: none;
  border-radius: ${BorderRadius.Circle};
`;

const styleBase = css`
  -webkit-appearance: none;
  position: relative;
  width: 100%;
  height: ${diameter}px;
  margin: 0;
  background-color: transparent;
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    ${thumb}
  }

  &::-moz-range-thumb {
    ${thumb}
  }

  &::-webkit-slider-runnable-track {
    ${track}
  }

  &::-moz-range-track {
    ${track}
  }
`;

const styleTheme: Frozen<Theme, Color> = {
  primary: Color.ThemePrimaryNeutral,
  danger: Color.ThemeDangerNeutral,
};
