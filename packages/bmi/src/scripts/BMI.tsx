import * as React from 'react';
import { LabeledSlider } from './components/LabeledSlider';

type State = {
  weight: number;
  height: number;
};

export class BMI extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      weight: 60,
      height: 170,
    };
  }

  private handleWeightChange = (weight: string) => this.setState({ weight: Number(weight) });
  private handleHeightChange = (height: string) => this.setState({ height: Number(height) });

  private calcBMI(w: number, h: number): number {
    const heightMeters = h * 0.01;
    return Math.round(w / (heightMeters * heightMeters));
  }

  public render() {
    const { weight, height } = this.state;

    return (
      <>
        <LabeledSlider
          label="Weight"
          unit="kg"
          min={40}
          max={150}
          value={weight}
          onValueChange={this.handleWeightChange}
        />
        <LabeledSlider
          label="Height"
          unit="cm"
          min={140}
          max={220}
          value={height}
          onValueChange={this.handleHeightChange}
        />
        <p>BMI: {this.calcBMI(weight, height)}</p>
      </>
    );
  }
}
