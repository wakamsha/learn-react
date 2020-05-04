// https://ja.reactjs.org/docs/forms.html
import React, { Component } from 'react';

type State = {
  value: string;
};

export class NameForm extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      value: '',
    };
  }

  private handleChange = (e: ChangeEvent<HTMLInputElement>) => this.setState({ value: e.target.value });

  private handleSubmit = (e: React.FormEvent) => {
    const { value } = this.state;
    e.preventDefault();
    console.info(`A name was submitted: ${value}`);
  };

  public render() {
    const { value } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={value} onChange={this.handleChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    );
  }
}
