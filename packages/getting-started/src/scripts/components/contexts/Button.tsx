import * as React from 'react';
import { ThemeContext } from './ThemeContext';
import { css } from 'emotion';

const baseStyle = css({
  padding: `8px 32px`,
  fontSize: 14,
});

type Props = {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export class Button extends React.Component<Props> {
  public render() {
    return (
      <button
        {...this.props}
        className={baseStyle}
        style={{
          background: this.context.background,
        }}
      >
        {this.props.label}
      </button>
    );
  }
}
Button.contextType = ThemeContext;
