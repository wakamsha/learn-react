import * as React from 'react';
import * as Remarkable from 'remarkable';

type State = {
  value: string;
};

export class MarkdownEditor extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      value: 'Hello, **world**!',
    };
  }

  private handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => this.setState({ value: e.target.value });

  public render() {
    return (
      <div className="markdown-editor">
        <h3>Input</h3>
        <label htmlFor="markdown-content" style={{ display: 'block' }}>
          Enter some markdown
        </label>
        <textarea
          id="markdown-content"
          cols={30}
          rows={10}
          onChange={this.handleChange}
          defaultValue={this.state.value}
        />
        <h3>Output</h3>
        <div className="content" dangerouslySetInnerHTML={this.getRawMarkup()} />
      </div>
    );
  }

  private getRawMarkup() {
    const md = new Remarkable();
    return {
      __html: md.render(this.state.value),
    };
  }
}
