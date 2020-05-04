// https://ja.reactjs.org/docs/refs-and-the-dom.html
import * as React from 'react';
import { css } from 'emotion';

const inputFileStyle = css({
  display: 'none',
});

const reportStyle = css({
  display: 'none',
});

const reportStyleActive = css(reportStyle, {
  display: 'block',
});

// 原則コールバック ref を使う
// React.createRef は特に使う必要もなさそう
export class CustomTextInput extends React.Component {
  private textInput: HTMLInputElement;
  private fileInput: HTMLInputElement;
  private report: HTMLParagraphElement;

  public componentDidMount() {
    this.focusTextInput();
  }

  private handleInputTextRef = (input: HTMLInputElement) => (this.textInput = input);
  private handleInputFileRef = (input: HTMLInputElement) => (this.fileInput = input);
  private handleReportRef = (elm: HTMLParagraphElement) => (this.report = elm);

  private focusTextInput = () => this.textInput && this.textInput.focus();

  private handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const reader = new FileReader();
    reader.readAsText(file, 'UTF-8');
    reader.onload = (e: any) => console.info(e.target.result);
    // eslint-disable-next-line no-param-reassign
    e.target.value = '';

    this.report.classList.add(reportStyleActive);
  };

  private handleClick = () => this.fileInput.click();

  public render() {
    return (
      <>
        <div>
          <input type="text" ref={this.handleInputTextRef} />
          <input type="button" value="Focus the text input" onClick={this.focusTextInput} />
        </div>
        <hr />
        <input type="file" ref={this.handleInputFileRef} className={inputFileStyle} onChange={this.handleUpload} />
        <button onClick={this.handleClick}>ファイル選択</button>
        <p ref={this.handleReportRef} className={reportStyle}>
          アップロード完了
        </p>
      </>
    );
  }
}
