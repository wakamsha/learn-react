import * as React from 'react';

export enum ScaleNames {
  C = 'Celsius',
  F = 'Fahrenheit',
}

type Props = {
  scale: ScaleNames;
  temperature: string;
  onTemperatureChange: (value: string) => void;
};

export function TemperatureInput(props: Props) {
  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => props.onTemperatureChange(e.target.value),
    [props.onTemperatureChange],
  );
  const { scale, temperature } = props;
  return (
    <fieldset>
      <legend>Enter temperature in {scale}</legend>
      <input type="number" value={temperature} onChange={handleChange} />
    </fieldset>
  );
}
