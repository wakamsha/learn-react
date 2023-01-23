import { css } from '@linaria/core';
import { type ChangeEvent } from 'react';

type Props = {
  label: string;
  unit: string;
  min: number;
  max: number;
  value: number;
  onValueChange: (value: number) => void;
};

export const LabeledSlider = ({ label, unit, min, max, value, onValueChange }: Props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onValueChange(Number(e.target.value));
  };

  return (
    <div>
      <label className={labelStyle}>
        {label} : <strong>{value}</strong>
        {unit}
      </label>
      <input type="range" className={inputStyle} min={min} max={max} value={value} onChange={handleChange} />
    </div>
  );
};

const labelStyle = css`
  display: block;
`;

const inputStyle = css`
  width: 100%;
`;
