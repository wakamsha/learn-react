import { css } from '@emotion/css';
import { type ChangeEvent } from 'react';

type Props = {
  label: string;
  unit: string;
  min: number;
  max: number;
  value: number;
  onValueChange: (value: number) => void;
};

/**
 * `LabeledSlider` はスライダー型のインターフェースとキャプション（ラベル）を表示します。
 */
export const LabeledSlider = ({ label, unit, min, max, value, onValueChange }: Props) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onValueChange(Number(event.target.value));
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
