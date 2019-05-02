import * as React from 'react';
import { BoilingVerdict } from './BoilingVerdict';
import { ScaleNames, TemperatureInput } from './TemperatureInput';

type State = {
  temperature: string;
  scale: ScaleNames;
};

function toCelsius(fahrenheit: number): number {
  return ((fahrenheit - 32) * 5) / 9;
}

function toFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32;
}

function tryConvert(temperature: string, convert: (val: number) => number): string {
  const input = Number(temperature);
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return `${rounded}`;
}

export function Calculator() {
  const [state, setState] = React.useState<State>({ temperature: '', scale: ScaleNames.C });
  const handleCelsiusChange = React.useCallback(
    (temperature: string) => setState({ temperature, scale: ScaleNames.C }),
    [state.scale],
  );
  const handleFahrenheitChange = React.useCallback(
    (temperature: string) => setState({ temperature, scale: ScaleNames.F }),
    [state.scale],
  );
  const { scale, temperature } = state;
  const celsius = scale === ScaleNames.F ? tryConvert(temperature, toCelsius) : temperature;
  const fahrenheit = scale === ScaleNames.C ? tryConvert(temperature, toFahrenheit) : temperature;

  return (
    <>
      <TemperatureInput scale={ScaleNames.C} temperature={celsius} onTemperatureChange={handleCelsiusChange} />
      <TemperatureInput scale={ScaleNames.F} temperature={fahrenheit} onTemperatureChange={handleFahrenheitChange} />
      <BoilingVerdict celsius={Number(temperature)} />
    </>
  );
}
