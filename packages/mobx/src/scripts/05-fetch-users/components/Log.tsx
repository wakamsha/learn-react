import * as React from 'react';
import { JSONPlaceholderStore } from '../stores/JSONPlaceholderStore';
import { css } from 'emotion';
import { observer } from 'mobx-react';

type Props = {
  store: JSONPlaceholderStore;
};

const baseStyle = css({
  padding: 16,
  background: '#0f192a',
  height: 'calc(100vh - 48px)',
  '> pre': {
    height: '100%',
    overflow: 'auto',
    color: '#d1edff',
    '> code': {
      lineHeight: 1.3,
    },
  },
});

@observer
export class Log extends React.Component<Props> {
  public componentDidMount() {
    this.props.store.getAllUsers();
  }

  public render() {
    const { store } = this.props;
    return (
      <figure className={baseStyle}>
        <pre>
          <code>{JSON.stringify({ ...store.users }, null, 2)}</code>
        </pre>
      </figure>
    );
  }
}
