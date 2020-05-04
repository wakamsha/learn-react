import * as Classnames from 'classnames';
import * as React from 'react';
import { Duration, Easing } from '../constants/VO';
import { css } from 'emotion';

type Props = {
  id: React.ReactText;
  children: React.ReactNode;
};

type State = {
  html: string;
};

const OFFSET = 30;
const ENTER_DELAY = 80;

const baseStyle = css({
  position: 'relative',
  overflow: 'hidden',
});

const animationStyle = css({
  opacity: 1,
  transform: 'none',
  transition: `transform ${Duration.Enter} ${ENTER_DELAY}ms ${Easing.Enter}, opacity ${Duration.Enter} ${ENTER_DELAY}ms ${Easing.Enter}`,
});

const enterStyle = css({
  opacity: 0,
  position: 'absolute',
  transition: 'none',
});

const leaveStyle = css({
  opacity: 0,
  transition: `transform ${Duration.Leave} ${Easing.Leave}, opacity ${Duration.Leave} ${Easing.Enter}`,
});

const horizontalStyle = css({
  [`&.${enterStyle}`]: {
    transform: `translate3d(${OFFSET}px, 0, 0)`,
  },
  [`&.${leaveStyle}`]: {
    transform: `translate3d(${OFFSET}px, 0, 0)`,
  },
});

export class Transition extends React.Component<Props, State> {
  private nextElm: HTMLDivElement;

  constructor(props: Props) {
    super(props);
    this.state = {
      html: '',
    };
  }

  public getSnapshotBeforeUpdate(prevProps: Props): null {
    const { id } = this.props;
    const { html } = this.state;

    if (id !== prevProps.id && !html && this.nextElm) {
      this.setState({
        html: this.nextElm.innerHTML,
      });
      this.nextElm.classList.add(enterStyle);
    }
    return null;
  }

  public componentDidUpdate(prevProps: Props) {
    const { id } = this.props;

    if (id !== prevProps.id) {
      window.setTimeout(() => {
        this.setState({ html: '' });
        this.nextElm.classList.remove(enterStyle);
      }, ENTER_DELAY);
    }
  }

  private handleRef = (elm: HTMLDivElement) => (this.nextElm = elm);

  public render() {
    const { children } = this.props;
    const { html } = this.state;

    return (
      <div className={baseStyle}>
        <div className={Classnames(animationStyle, horizontalStyle)} ref={this.handleRef}>
          {children}
        </div>
        <div
          className={Classnames(animationStyle, horizontalStyle, html && leaveStyle)}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    );
  }
}
