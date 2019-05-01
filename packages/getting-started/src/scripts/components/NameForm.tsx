import * as React from 'react';

type State = {
  value: string;
};
export class NameForm extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      value: '',
    };
  }

  private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ value: e.target.value });

  private handleSubmit = (e: React.FormEvent) => {
    alert(`A name was submitted: ${this.state.value}`);
    e.preventDefault();
  };

  public render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    );
  }
}
