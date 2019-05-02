import * as React from 'react';
import { css } from 'emotion';

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

export class LabeledSlider extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => this.props.onValueChange(e.target.value);

  public render() {
    const { label, unit, min, max, value } = this.props;
    return (
      <div>
        <label className={labelStyle}>
          {label} : <strong>{value}</strong>
          {unit}
        </label>
        <input type="range" className={inputStyle} min={min} max={max} value={value} onChange={this.handleChange} />
      </div>
    );
  }
}
