import type { ChangeEvent } from 'react';
import { useCallback } from 'react';

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

export const TemperatureInput = ({ scale, temperature, onTemperatureChange }: Props) => {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onTemperatureChange(e.target.value);
    },
    [onTemperatureChange],
  );

  return (
    <fieldset>
      <legend>Enter temperature in {scale}</legend>
      <input type="number" value={temperature} onChange={handleChange} />
    </fieldset>
  );
};
