// https://ja.reactjs.org/docs/forms.html
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
    const { value } = this.state;

    e.preventDefault();
    console.info(`Your favorite flavor is ${value}`);
  };

  public render() {
    const { value } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite flavor:
          <select value={value} onChange={this.handleChange}>
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
