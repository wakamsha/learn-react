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

export class Calculator extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      temperature: '',
      scale: ScaleNames.C,
    };
  }

  private handleCelsiusChange = (temperature: string) => this.setState({ temperature, scale: ScaleNames.C });
  private handleFahrenheitChange = (temperature: string) => this.setState({ temperature, scale: ScaleNames.F });

  public render() {
    const { scale, temperature } = this.state;
    const celsius = scale === ScaleNames.F ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === ScaleNames.C ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <>
        <TemperatureInput scale={ScaleNames.C} temperature={celsius} onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput
          scale={ScaleNames.F}
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange}
        />
        <BoilingVerdict celsius={Number(temperature)} />
      </>
    );
  }
}
