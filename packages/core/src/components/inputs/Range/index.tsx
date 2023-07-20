import { css } from '@emotion/css';
import { type ChangeEvent } from 'react';
import { BorderRadius, Duration } from '../../../constants/Style';
import { cssVar, square } from '../../../helpers/Style';

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

/**
 * スライダーを操作して規定の範囲から任意の値を選択できる UI です。
 */
export const Range = ({ value, onChange, min = 0, max = 100, step = 1, disabled, theme = 'primary' }: Props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => onChange(Number(e.target.value));

  const ratio = (value / max) * 100;

  return (
    <div className={styleWrapper}>
      <input
        className={styleBase}
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        onChange={handleChange}
      />
      <div
        style={{
          background: `linear-gradient(to right, ${styleTheme[theme]} 0%, ${styleTheme[theme]} ${ratio}%, ${cssVar(
            'LineNeutral',
          )} ${ratio}%)`,
        }}
        className={styleTrack}
      />
    </div>
  );
};

const styleWrapper = css`
  position: relative;
`;

const styleTrack = css`
  position: absolute;
  top: 50%;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 2px;
  transform: translate3d(0, -2px, 0);
`;

const diameter = 24;

const thumb = `
  -webkit-appearance: none;
  margin-top: -${diameter / 2}px;
  cursor: pointer;
  background-color: white;
  border: 1px solid ${cssVar('LineNeutral')};
  border-radius: ${BorderRadius.Circle};
  transition: transform ${Duration.Fade};
  transform: scale3d(1, 1, 1);
  ${square(diameter)}

  &:active {
    transform: scale3d(1.2, 1.2, 1);
  }
`;

const track = `
  width: 100%;
  height: 2px;
  background-color: transparent;
  border: none;
`;

const styleBase = css`
  position: relative;
  z-index: 2;
  width: 100%;
  height: ${diameter}px;
  margin: 0;
  -webkit-appearance: none;
  background-color: transparent;
  outline: none;

  &::-webkit-slider-thumb {
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

const styleTheme: Frozen<Theme, ReturnType<typeof cssVar>> = {
  primary: cssVar('ThemePrimaryNeutral'),
  danger: cssVar('ThemeDangerNeutral'),
};
