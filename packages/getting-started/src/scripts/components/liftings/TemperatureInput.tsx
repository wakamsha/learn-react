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

export class TemperatureInput extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => this.props.onTemperatureChange(e.target.value);

  public render() {
    const { scale, temperature } = this.props;
    return (
      <fieldset>
        <legend>Enter temperature in {scale}</legend>
        <input type="number" value={temperature} onChange={this.handleChange} />
      </fieldset>
    );
  }
}
