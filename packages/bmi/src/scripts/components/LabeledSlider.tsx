import { css } from 'emotion';
import React, { ChangeEvent, FC } from 'react';

type Props = {
  label: string;
  unit: string;
  min: number;
  max: number;
  value: number;
  onValueChange: (value: string) => void;
};

const labelStyle = css({
  display: 'block',
});

const inputStyle = css({
  width: '100%',
});

export const LabeledSlider: FC<Props> = (props: Props) => {
  // const handleChange = useCallback(
  //   (e: ChangeEvent<HTMLInputElement>) => props.onValueChange(e.target.value),
  //   [],
  // );
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => props.onValueChange(e.target.value);

  const { label, unit, min, max, value } = props;
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
