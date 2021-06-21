// https://ja.reactjs.org/docs/refs-and-the-dom.html
import { css } from '@emotion/css';
import { ChangeEvent, Component, createRef } from 'react';

const inputFileStyle = css({
  display: 'none',
});

const reportStyle = css({
  display: 'none',
});

const reportStyleActive = css(reportStyle, {
  display: 'block',
});

export class CustomTextInput extends Component {
  private textInput = createRef<HTMLInputElement>();
  private fileInput = createRef<HTMLInputElement>();
  private report = createRef<HTMLParagraphElement>();

  public componentDidMount() {
    this.focusTextInput();
  }

  private focusTextInput = () => this.textInput.current?.focus();

  private handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const reader = new FileReader();
    reader.readAsText(file, 'UTF-8');
    reader.onload = (e: any) => console.info(e.target.result);
    // eslint-disable-next-line no-param-reassign
    e.target.value = '';

    this.report.current?.classList.add(reportStyleActive);
  };

  private handleClick = () => this.fileInput.current?.click();

  public render() {
    return (
      <>
        <div>
          <input type="text" ref={this.textInput} />
          <input type="button" value="Focus the text input" onClick={this.focusTextInput} />
        </div>
        <hr />
        <input type="file" ref={this.fileInput} className={inputFileStyle} onChange={this.handleUpload} />
        <button onClick={this.handleClick}>ファイル選択</button>
        <p ref={this.report} className={reportStyle}>
          アップロード完了
        </p>
      </>
    );
  }
}
