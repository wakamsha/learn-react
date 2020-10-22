import React, { ChangeEvent, Component } from 'react';

type State = {
  going: boolean;
  numOfGuest: number;
};
export class Reservation extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      going: true,
      numOfGuest: 2,
    };
  }

  private handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    name === 'going' ? this.setState({ going: !!value }) : this.setState({ numOfGuest: Number(value) });
  };

  public render() {
    const { going, numOfGuest } = this.state;

    return (
      <form>
        <label>
          Is going:
          <input type="checkbox" name="going" checked={going} onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Num of guest:
          <input type="number" name="numOfGuest" value={numOfGuest} onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}
