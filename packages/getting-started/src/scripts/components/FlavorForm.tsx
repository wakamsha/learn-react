import * as React from 'react';

type State = {
  value: string;
};
export class FlavorForm extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = { value: 'coconut' };
  }

  private handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => this.setState({ value: e.target.value });

  private handleSubmit = (e: React.FormEvent) => {
    alert(`Your favorite flavoe is ${this.state.value}`);
    e.preventDefault();
  };

  public render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <button>Submit</button>
      </form>
    );
  }
}
