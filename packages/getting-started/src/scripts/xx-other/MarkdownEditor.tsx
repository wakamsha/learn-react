import * as Remarkable from 'remarkable';
import React from 'react';

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

  private getRawMarkup() {
    const { value } = this.state;

    const md = new Remarkable();
    return {
      __html: md.render(value),
    };
  }

  private handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => this.setState({ value: e.target.value });

  public render() {
    const { value } = this.state;

    return (
      <div className="markdown-editor">
        <h3>Input</h3>
        <label htmlFor="markdown-content" style={{ display: 'block' }}>
          Enter some markdown
        </label>
        <textarea id="markdown-content" cols={30} rows={10} onChange={this.handleChange} defaultValue={value} />
        <h3>Output</h3>
        <div className="content" dangerouslySetInnerHTML={this.getRawMarkup()} />
      </div>
    );
  }
}
