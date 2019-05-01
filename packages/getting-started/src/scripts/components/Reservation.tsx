import * as React from 'react';

type State = {
  going: boolean;
  numOfGuest: number;
};
export class Reservation extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      going: true,
      numOfGuest: 2,
    };
  }

  private handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    name === 'going' ? this.setState({ going: !!value }) : this.setState({ numOfGuest: Number(value) });
  };

  public render() {
    return (
      <form>
        <label>
          Is going:
          <input type="checkbox" name="going" checked={this.state.going} onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Num of guest:
          <input type="number" name="numOfGuest" value={this.state.numOfGuest} onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}
