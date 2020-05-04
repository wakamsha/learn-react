import React, { ChangeEvent, useCallback } from 'react';

export const ScaleNames = {
  C: 'Celsius',
  F: 'Fahrenheit',
} as const;
export type ScaleNames = typeof ScaleNames[keyof typeof ScaleNames];

type Props = {
  scale: ScaleNames;
  temperature: string;
  onTemperatureChange: (value: string) => void;
};

export function TemperatureInput(props: Props) {
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => props.onTemperatureChange(e.target.value), [
    props,
  ]);
  const { scale, temperature } = props;
  return (
    <fieldset>
      <legend>Enter temperature in {scale}</legend>
      <input type="number" value={temperature} onChange={handleChange} />
    </fieldset>
  );
}
