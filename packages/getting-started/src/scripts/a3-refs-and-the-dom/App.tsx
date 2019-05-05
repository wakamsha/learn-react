// https://ja.reactjs.org/docs/refs-and-the-dom.html
import * as React from 'react';

// 原則コールバック ref を使う
// React.createRef は特に使う必要もなさそう
export class CustomTextInput extends React.Component {
  private textInput: HTMLInputElement;

  constructor(props: {}) {
    super(props);
  }

  private focusTextInput = () => this.textInput && this.textInput.focus();

  private handleRef = (input: HTMLInputElement) => (this.textInput = input);

  public componentDidMount() {
    this.focusTextInput();
  }

  public render() {
    return (
      <div>
        <input type="text" ref={this.handleRef} />
        <input type="button" value="Focus the text input" onClick={this.focusTextInput} />
      </div>
    );
  }
}
